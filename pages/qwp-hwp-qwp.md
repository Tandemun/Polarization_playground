---
layout: default
title: 3-Paddle Polarization Controller
mathjax: true
---

# QWP-HWP-QWP Polarization Controller Configuration

## Overview

A **polarization controller** is an optical device designed to manipulate the **state of polarization (SOP)** of light within an optical fiber or free-space system. One of the most widely used designs, particularly in fiber optics and polarization-sensitive measurements, is the **three-plate polarization controller** composed of two **quarter-wave plates (QWP)** and one **half-wave plate (HWP)**, arranged in sequence: **QWP-HWP-QWP**.

This configuration offers full control over the polarization state of an optical signal and can transform any input SOP into any desired output SOP through appropriate adjustments of the plates' orientations.

---

## Physical Principles

Wave plates are birefringent optical elements that introduce a controlled phase delay between orthogonal polarization components of an incident light wave:

- A **quarter-wave plate (QWP)** introduces a 90° phase shift, converting linear polarization into elliptical or circular polarization and vice versa.
- A **half-wave plate (HWP)** introduces a 180° phase shift, rotating the plane of linear polarization without changing the ellipticity.

By combining two QWPs and one HWP, it is possible to create a versatile polarization transformer. The device operates according to the following principle:

1. The **first QWP** converts the initial SOP into an intermediate elliptical or circular state.
2. The **HWP** rotates this intermediate state around the Poincaré sphere.
3. The **second QWP** adjusts the final ellipticity and orientation, producing the desired output SOP.

This sequential operation effectively allows for an arbitrary transformation between two polarization states.

---

## Mathematical Description

The action of each wave plate on the SOP can be represented by a **Jones matrix** or on the **Poincaré sphere** via **rotation operators**.

In the Jones formalism, the matrix for a wave plate with a fast axis at an angle $$ \theta $$ is:

$$
M(\theta, \delta) = R(-\theta) \cdot 
\begin{pmatrix} 
1 & 0 \\ 
0 & e^{i\delta} 
\end{pmatrix} \cdot R(\theta)
$$

where:
- \\( \delta \\) is the retardation (π/2 for a QWP, π for a HWP),
- \\( R(\theta) \\) is the rotation matrix by angle \\( \\theta \\).

The combined transformation of the QWP-HWP-QWP system is the product of three such matrices.

Alternatively, on the **Poincaré sphere** (a geometric representation of SOPs), the action of each wave plate corresponds to a rotation about a specific axis:
- A QWP corresponds to a 90° rotation about an axis lying at 45° to the principal axes.
- A HWP corresponds to a 180° rotation about an axis aligned with the fast axis.

The three consecutive rotations allow full reachability of any point on the Poincaré sphere from any starting point.

---

## Implementation

### Manual Controllers

In practical devices, each wave plate is mounted on a rotatable stage, often with high-precision adjustment mechanisms such as micrometer screws or motorized actuators. Operators manually set the angles to achieve the desired SOP.

### Fiber-based Controllers

In fiber optics, the plates are sometimes replaced by loops of optical fiber under controlled stress (e.g., using fiber squeezers or fiber paddles) that mimic the action of wave plates by inducing birefringence along specific axes.

---

## Advantages

- **Full Polarization Control:** Arbitrary transformations between any input and output polarization states.
- **Compactness:** The three-plate configuration is relatively simple and compact compared to alternative methods.
- **Predictability:** Deterministic relation between plate angles and resulting SOP.

---

## Applications

- **Coherent Optical Communications:** Polarization tracking and adjustment.
- **Fiber-Optic Sensors:** Polarization optimization for interferometric sensitivity.
- **Quantum Optics:** Preparation of photon polarization states for experiments.
- **Spectroscopy and Microscopy:** Polarization control to enhance contrast and reveal anisotropic properties.

---

## Conclusion

The **QWP-HWP-QWP polarization controller** is a fundamental tool in modern optics, providing a simple yet powerful means of fully controlling the state of polarization. Understanding its operation is essential for engineers and researchers working in optical communications, metrology, and advanced photonics research.


<div id="controllerSettings"></div>
<div class="applet" id="controller"></div>
<div class="applet" id="poincare"></div>
<div id="poincareSettings"></div>
<div style="display: flex; flex-wrap: wrap; justify-content: center; padding-top: 1rem;">
    <div id="ellips0"></div>
    <div id="ellips1"></div>
    <div id="ellips2"></div>
    <div id="ellips3"></div>
</div>

<script>  
  var controller = new GGBApplet(createGGBParams("controller", "twr2vny4"), true);
  var poincare = new GGBApplet(createGGBParams("poincare", "rvbafww5"), true);
  var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3"), true);
  var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3"), true);
  var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3"), true);
  var ellips3 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3"), true);

  window.onload = function () {
      controller.inject("controller")
      poincare.inject("poincare");
      ellips0.inject("ellips0");
      ellips1.inject("ellips1");
      ellips2.inject("ellips2");
      ellips3.inject("ellips3");
  };

  let appletsLoaded = {
      controller: false,
      poincare: false,
      ellips0: false,
      ellips1: false,
      ellips2: false,
      ellips3: false  
  };

  function setupAll() {	
    console.log("Staring initial setup");
    setMode(poincare, "full");
    try {
	    createAppletControls(controller, ['th1', 'th2', 'th3'], 'controllerSettings');
    } catch (e) {    
	    console.error(`Error creating controller menu:`, e);
    }
	  try {
      createPoincareSettings(poincare, ['P0', 'P1', 'P2','P3'], 'poincareSettings');
    } catch (e) {
      console.error(`Error creating poincare menu:`, e);
    }  
      	
    console.log("Set background colors for applets");
    const bgColor = getCssVariable("--bgColor")
    controller.setGraphicsOptions(-1,{"bgColor":bgColor});
    controller.setGraphicsOptions(1,{"bgColor":bgColor});
    poincare.setGraphicsOptions(-1,{"bgColor":bgColor});
    poincare.setGraphicsOptions(1,{"bgColor":bgColor});
    ellips0.setGraphicsOptions(1,{"bgColor":bgColor});
    ellips1.setGraphicsOptions(1,{"bgColor":bgColor});
    ellips2.setGraphicsOptions(1,{"bgColor":bgColor});
    ellips3.setGraphicsOptions(1,{"bgColor":bgColor});	
      
    console.log("4");
    setColors(controller,{
      "--orange": ["paddle1", "paddle3"],
      "--blue":   ["paddle2"],
    });
    setColors(poincare,{
      [bgColor]:  ["sphere"],
      "black":    ["P0","P0trace"],
      "--orange": ["P1", "P1trace", "P0P1", "A11", "A12", "P3", "P3trace", "P2P3", "A31", "A32"],
      "--blue":   ["P2", "P2trace", "P1P2", "A21", "A22"],
    });        
	  
    setColors(ellips0,{"black":   ["ellips"]});
    setColors(ellips1,{"--orange":["ellips"]});
    setColors(ellips2,{"--blue":  ["ellips"]});
    setColors(ellips3,{"--orange":["ellips"]});
	        
    poincare.setValue("phi1", 90);
    poincare.setValue("phi2", 180);
    poincare.setValue("phi3", 90);

    [
      [slider_th1, "th1", 5],
      [slider_th2, "th2", 25],
      [slider_th3, "th3", 45]
    ].forEach(([slider, name, value]) => {
      slider.value = value;
      controller.setValue(name, value);
      poincare.setValue(name, value);
    });
      
        
    controller.registerObjectUpdateListener("th1", () => syncValue(controller, "th1", poincare, "th1"));
    controller.registerObjectUpdateListener("th2", () => syncValue(controller, "th2", poincare, "th2"));
    controller.registerObjectUpdateListener("th3", () => syncValue(controller, "th3", poincare, "th3"));
    
    syncCoords(poincare, "P0", ellips0, "S");
    syncCoords(poincare, "P1", ellips1, "S");
    syncCoords(poincare, "P2", ellips2, "S"); 
    syncCoords(poincare, "P3", ellips3, "S");
    poincare.registerObjectUpdateListener("P0", () => syncCoords(poincare, "P0", ellips0, "S"));
    poincare.registerObjectUpdateListener("P1", () => syncCoords(poincare, "P1", ellips1, "S"));
    poincare.registerObjectUpdateListener("P2", () => syncCoords(poincare, "P2", ellips2, "S"));   
    poincare.registerObjectUpdateListener("P3", () => syncCoords(poincare, "P3", ellips3, "S"));
}	
</script>


---
layout: default
title: 3-Paddle Polarization Controller
---

<h1>Interactive Model of a 3-Paddle Polarization Controller</h1>
<h2>3-Paddle Polarization Controller</h2>
<p>This is a model of a classical manual 3-paddle polarization controller. Use the sliders to adjust paddle rotation angles α, β, and γ.</p>
<h2>State of Polarization</h2>
<p>This visualization shows the evolution of the state of polarization (SOP) at different stages within the controller. The top displays the Poincaré sphere, while the bottom shows the corresponding polarization ellipses.</p>

<div class="applet" id="controller"></div>
<div class="applet" id="poincare"></div>
<div style="display: flex; gap: 0px; flex-wrap: wrap; justify-content: center;">
    <div id="ellips0"></div>
    <div id="ellips1"></div>
    <div id="ellips2"></div>
    <div id="ellips3"></div>
</div>


<script>  
  var controller = new GGBApplet(createGGBParams("controller", "twr2vny4"), true);
  var poincare = new GGBApplet(createGGBParams("poincare", "rvbafww5",{enableRightClick: true}), true);
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
    setMode(poincare, "full");
    poincare.setValue("phi1", 90)
    poincare.setValue("phi2", 180)
    poincare.setValue("phi3", 90)
    poincare.setColor("P0", 0,0,0)
    ellips0.setColor("ellips", 0, 0, 0)

    const backGround [r,g,b] = hexToRgb("red")
    controller.setBackgroundColor(backGround);
    poincare.setBackgroundColor(backGround);
    ellips0.setBackgroundColor(backGround);
    ellips1.setBackgroundColor(backGround);
    ellips2.setBackgroundColor(backGround);
    ellips3.setBackgroundColor(backGround);

    setColors([
      { applet: controller, name: "paddle1" },
      { applet: controller, name: "th1" },
      { applet: poincare,   name: "P1" },
      { applet: poincare,   name: "P0P1"},
      { applet: poincare,   name: "A11"},
      { applet: poincare,   name: "A12"},
      { applet: ellips1,    name: "ellips"},  
    ], "orange");

    setColors([
      { applet: controller, name: "paddle2" },
      { applet: controller, name: "th2" },
      { applet: poincare,   name: "P2" },
      { applet: poincare,   name: "A21"},
      { applet: poincare,   name: "A22"},        
      { applet: poincare,   name: "P1P2"},
      { applet: ellips2,    name: "ellips"},  
    ], "blue");    

    setColors([
      { applet: controller, name: "paddle3" },
      { applet: controller, name: "th3" },
      { applet: poincare,   name: "P3" },
      { applet: poincare,   name: "P2P3"},
      { applet: poincare,   name: "A31"},
      { applet: poincare,   name: "A32"},        
      { applet: ellips3,    name: "ellips"},  
    ], "orange"); 
	      
    syncValue(controller, "th1", poincare, "th1");
    syncValue(controller, "th2", poincare, "th2");
    syncValue(controller, "th3", poincare, "th3");
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


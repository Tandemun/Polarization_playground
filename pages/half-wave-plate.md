---
layout: default
title: Half-Wave Plate
---

# Half-Wave Plate on the Poincaré Sphere

A **half-wave plate (HWP)** introduces a phase shift of $\pi$ between fast and slow axes.

$$
M_{\text{HWP}}(\theta) =
\begin{bmatrix}
\cos 2\theta & \sin 2\theta \\
\sin 2\theta & -\cos 2\theta
\end{bmatrix}
$$

## Interactive Applet

<div id="ggb-hwp" style="width: 100%; height: 500px;"></div>

<script>
  var applet = new GGBApplet({
    "id": "ggb-hwp",
    "material_id": "aw9fezvv",  // ← вставь свой
    "width": 800,
    "height": 500,
    "showToolbar": false,
    "showMenuBar": false,
    "showAlgebraInput": false,
    "showFullscreenButton": true
  }, true);
  window.addEventListener("load", () => applet.inject("ggb-hwp"));
</script>

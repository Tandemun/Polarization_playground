---
layout: default
title: Half-Wave Plate
---

# Half-Wave Plate on the Poincaré Sphere

A **half-wave plate (HWP)** introduces a phase shift of \(\pi\) between fast and slow axes.

$$
M_{\text{HWP}}(\theta) =
\begin{bmatrix}
\cos 2\theta & \sin 2\theta \\
\sin 2\theta & -\cos 2\theta
\end{bmatrix}
$$

## Interactive Applet

<div id="ggbApplet1"></div>

<script>
  var applet1 = new GGBApplet(createGGBParams("ggbApplet1", "pts6vg4r"), true);
  window.onload = function() { applet1.inject('ggbApplet1')};
</script>

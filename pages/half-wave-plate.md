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
  var params1 = {
  	"id": "ggbApplet1",
  	"width":600,
  	"height":600,
  	"showMenuBar":false,
  	"showAlgebraInput":false,
  	"showToolBar":false,
  	"showToolBarHelp":false,
  	"showResetIcon":false,
  	"enableLabelDrags":false,
  	"enableShiftDragZoom":false,
  	"enableRightClick":false,
  	"errorDialogsActive":false,
  	"useBrowserForJS":true,
  	"allowStyleBar":false,
  	"preventFocus":false,
  	"showZoomButtons":false,
  	"showResetIcon": false,
  	"capturingThreshold":3,
  	// add code here to run when the applet starts
  	//"appletOnLoad":function(api){ /* api.evalCommand('Segment((1,2),(3,4))');*/ },
  	"showFullscreenButton":false,
  	"scale":1,
  	"disableAutoScale":true,
  	"allowUpscale":false,
  	"clickToLoad":false,
  	"appName":"classic",
  	"buttonRounding":0.7,
  	"buttonShadows":false,
  	"language":"en",
  	// use this instead of ggbBase64 to load a material from geogebra.org
  	"material_id":"pts6vg4r",
  	// use this instead of ggbBase64 to load a .ggb file
  	// "filename":"myfile.ggb",
  
  };
  
  var applet1 = new GGBApplet(params1, true);
  window.onload = function() { applet1.inject('ggbApplet1')};
</script>

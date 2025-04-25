---
layout: default
title: 3-Paddle Polarization Controller
---


<div id="ggbApplet1"></div>
<div id="ggbApplet2"></div>
<div id="ggbApplet3"></div>

<script>
  function ggbOnInit(param) {
	  if (param == "ggbApplet1") {
		  // init update listeners for ggbApplet1
		  ggbApplet1.registerObjectUpdateListener("P0", "abcListener");
		  ggbApplet1.registerObjectUpdateListener("P1", "abcListener");
		  ggbApplet1.registerObjectUpdateListener("P2", "abcListener");
	  }
  }

function abcListener(objName) {
  console.log("abcListener triggered for:", objName);

  try {
    const x = ggbApplet1.getXcoord(objName);
    const y = ggbApplet1.getYcoord(objName);
    const z = ggbApplet1.getZcoord(objName);
    console.log(`Coordinates of ${objName}: x=${x}, y=${y}, z=${z}`);

    if (objName === "P0") {
      ggbApplet2.setValue("i", x);
      ggbApplet2.setValue("j", y);
      ggbApplet2.setValue("k", z);
      console.log(`Updated vector P in applet2`);
    } else if (objName === "P1") {
      ggbApplet3.setValue("i", x);
      ggbApplet3.setValue("j", y);
      ggbApplet3.setValue("k", z);
      console.log(`Updated vector P in applet3`);
    }

  } catch (e) {
    console.error("Error in abcListener:", e);
  }
}

  
  var applet1 = new GGBApplet(createGGBParams("ggbApplet1", "hdmsanwn"), true);
  var applet2 = new GGBApplet(createGGBParams("ggbApplet2", "ar9nzxm3"), true);
	var applet3 = new GGBApplet(createGGBParams("ggbApplet3", "ar9nzxm3"), true);
  window.onload = function() {
	  applet1.inject('ggbApplet1');
	  applet2.inject('ggbApplet2');
		applet3.inject('ggbApplet3');
};
</script>

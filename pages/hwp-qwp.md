---
layout: default
title: 3-Paddle Polarization Controller
---


<div id="ggbApplet1"></div>
<div style="display: flex; gap: 1px; flex-wrap: wrap; justify-content: center;">
  <div id="ggbApplet2"></div>
  <div id="ggbApplet3"></div>
  <div id="ggbApplet4"></div>
</div>


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
    const coords = ggbApplet1.getCoords(objName);
    console.log(`Coordinates of ${objName}: {coords}`);

    if (objName === "P0") {
      ggbApplet2.setCoords("S", coords);
      console.log(`Updated vector S in applet2`);
    } else if (objName === "P1") {
      ggbApplet3.setCoords("S", coords);
      console.log(`Updated vector S in applet3`);
    } else if (objName === "P2") {
      ggbApplet4.setCoords("S", coords);
      console.log(`Updated vector S in applet4`);
  } catch (e) {
    console.error("Error in abcListener:", e);
  }
}

  
  var applet1 = new GGBApplet(createGGBParams("ggbApplet1", "hdmsanwn"), true);
  var applet2 = new GGBApplet(createGGBParams("ggbApplet2", "ar9nzxm3",{width: 200, height:200}), true);
	var applet3 = new GGBApplet(createGGBParams("ggbApplet3", "ar9nzxm3",{width: 200, height:200}), true);
	var applet4 = new GGBApplet(createGGBParams("ggbApplet4", "ar9nzxm3",{width: 200, height:200}), true);
  window.onload = function() {
	  applet1.inject('ggbApplet1');
	  applet2.inject('ggbApplet2');
		applet3.inject('ggbApplet3');
		applet4.inject('ggbApplet3');
};
</script>

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

    // Пытаемся получить значение
    try {
      const changedValue = ggbApplet1.getValue(objName);
      console.log("Changed value from ggbApplet1:", objName, "=", changedValue);

      switch (objName) {
        case "P0":
          ggbApplet2.setValue("P", changedValue);
          console.log("Updated ggbApplet2 P =", changedValue);
          break;
        case "P1":
          ggbApplet3.setValue("P", changedValue);
          console.log("Updated ggbApplet3 P =", changedValue);
          break;
        default:
          console.log("No action for:", objName);
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

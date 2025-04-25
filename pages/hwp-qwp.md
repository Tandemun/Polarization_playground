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
    // get value from applet1 and set value in applet2 and applet3	 
	  var changedValue = ggbApplet1.getValue(objName);
	  switch(objName) {
		  case "PO": ggbApplet2.setValue("P", changedValue);
		    break;
		  case "P1": ggbApplet3.setValue("P", changedValue);
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

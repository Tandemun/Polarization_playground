---
layout: default
title: 3-Paddle Polarization Controller
---

<style>

	h1 {
		text-align: center;
		margin-bottom: 40px;
	}

	.container1 {
		display: flex;
		justify-content: center;
		gap: 20px;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 600px;
	}

	.text-block {
		height: 150px; /* Alignment by height of headings+text */
		margin-bottom: 10px;
	}

	.applet {
		width: 600px;
		height: 600px;
	}

	@media (max-width: 1260px) {
		.container {
		  flex-direction: column;
		  align-items: center;
		}

		.text-block {
		  height: auto;
		}
	}
</style>

<h1>Interactive Model of a 3-Paddle Polarization Controller</h1>

<div class="container1">
  <!-- Left column -->
  <div class="column">
    <div class="text-block">
      <h2>3-Paddle Polarization Controller</h2>
      <p>This is a model of a classical manual 3-paddle polarization controller. Use the sliders to adjust paddle rotation angles α, β, and γ.</p>
    </div>
    <div id="ggbApplet1" class="applet"></div>
  </div>

  <!-- Right column -->
  <div class="column">
    <div class="text-block">
      <h2>State of Polarization</h2>
      <p>This visualization shows the evolution of the state of polarization (SOP) at different stages within the controller. The top displays the Poincaré sphere, while the bottom shows the corresponding polarization ellipses.</p>
    </div>
    <div id="ggbApplet2" class="applet"></div>
		<div id="ggbApplet3" class="applet"></div>
  </div>
</div>

<div id="ggbApplet1"></div>

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
    // get value from applet1 and set value in applet2	
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

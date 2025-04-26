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
      <p>This is a model of a classical manual 2-paddle polarization controller. Use the sliders to adjust paddle rotation angles α, β, and γ.</p>
    </div>
    <div id="controller"></div>
    <div style="display: flex; gap: 0px; flex-wrap: wrap; justify-content: center;">
      <div id="ellips0"></div>
      <div id="ellips1"></div>
      <div id="ellips2"></div>
    </div>    

  </div>

  <!-- Right column -->
  <div class="column">
    <div class="text-block">
      <h2>State of Polarization</h2>
      <p>This visualization shows the evolution of the state of polarization (SOP) at different stages within the controller. The top displays the Poincaré sphere, while the bottom shows the corresponding polarization ellipses.</p>
    </div>
    <div id="poincare"></div>
  </div>
</div>


<script>  
  var controller = new GGBApplet(createGGBParams("controller", "kfrkrdcp", {width: 600, height: 450}), true);
  var poincare = new GGBApplet(createGGBParams("poincare", "rvbafww5",{enableRightClick: true}), true);
  var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3", {width: 150, height: 150}), true);

  window.onload = function () {
    controller.inject("controller")
    poincare.inject("poincare");
    ellips0.inject("ellips0");
    ellips1.inject("ellips1");
    ellips2.inject("ellips2");
  };

let appletsLoaded = {
  controller: false,
  poincare: false,
  ellips0: false,
  ellips1: false,
  ellips2: false
};

  

function setupAll() {	
    setMode(poincare, "threePoints");
    poincare.setValue("phi1", 90)
    poincare.setValue("phi2", 90)
    poincare.setColor("P0", 0,0,0)
    ellips0.setColor("ellips", 0, 0, 0)

    setColors([
      { applet: controller, name: "paddle1" },
      { applet: controller, name: "th1" },
      { applet: poincare,   name: "P1" },
      { applet: poincare,   name: "P0P1"},
      { applet: ellips1,    name: "ellips"},  
    ], 38,139,210);

    setColors([
      { applet: controller, name: "paddle2" },
      { applet: controller, name: "th2" },
      { applet: poincare,   name: "P2" },
      { applet: poincare,   name: "P1P2"},
      { applet: ellips2,    name: "ellips"},  
    ], 203,75,22);    
	      
    syncValue(controller, "th1", poincare, "th1");
    syncValue(controller, "th2", poincare, "th2");  
    controller.registerObjectUpdateListener("th1", () => syncValue(controller, "th1", poincare, "th1"));
    controller.registerObjectUpdateListener("th2", () => syncValue(controller, "th2", poincare, "th2"));
    
    syncCoords(poincare, "P0", ellips0, "S");
    syncCoords(poincare, "P1", ellips1, "S");
    syncCoords(poincare, "P2", ellips2, "S"); 
    poincare.registerObjectUpdateListener("P0", () => syncCoords(poincare, "P0", ellips0, "S"));
    poincare.registerObjectUpdateListener("P1", () => syncCoords(poincare, "P1", ellips1, "S"));
    poincare.registerObjectUpdateListener("P2", () => syncCoords(poincare, "P2", ellips2, "S"));   
}
</script>


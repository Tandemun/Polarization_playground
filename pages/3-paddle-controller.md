---
layout: default
title: 3-Paddle Polarization Controller
---

<style>
  body {
	  font-family: sans-serif;
	  margin: 20px;
		line-height: 1.6;
	}

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
  </div>
</div>

<div id="ggbApplet1"></div>

<script>
  function ggbOnInit(param) {
	  if (param == "ggbApplet1") {
		  // init update listeners for ggbApplet1
		  ggbApplet1.registerObjectUpdateListener("α", "abcListener");
		  ggbApplet1.registerObjectUpdateListener("β", "abcListener");
		  ggbApplet1.registerObjectUpdateListener("γ", "abcListener");
	  }
  }

  function abcListener(objName) {
    // get value from applet1 and set value in applet2	
	  var changedValue = 2*ggbApplet1.getValue(objName);/* Multiple by 2 due to double of angles on the Poincare sphere */
	  ggbApplet2.setValue(objName, changedValue);		
  } 
  
  var applet1 = new GGBApplet(createGGBParams("ggbApplet1", "pts6vg4r"), true);
  var applet2 = new GGBApplet(createGGBParams("ggbApplet2", "hdmsanwn"), true);
  window.onload = function() {
	  applet1.inject('ggbApplet1');
	  applet2.inject('ggbApplet2');
	  // Запрет прокрутки мыши (зум колесиком)
	  document.getElementById('ggbApplet2').addEventListener('wheel', function (e) {
	    e.preventDefault();
	    }, { passive: false });
	
	  // Запрет пинча на мобильных
	  document.getElementById('ggbApplet2').addEventListener('touchmove', function (e) {
	    if (e.touches.length > 1) e.preventDefault();
	    }, { passive: false });
};
</script>

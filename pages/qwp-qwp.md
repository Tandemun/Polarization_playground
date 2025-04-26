---
layout: default
title: 3-Paddle Polarization Controller
---
```html
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
```html
```javascript
<script>	
  // Создание апплетов с уникальными идентификаторами
  var controller = new GGBApplet(createGGBParams("controller", "kfrkrdcp", {width: 600, height: 450}), true);
  var poincare = new GGBApplet(createGGBParams("poincare", "whv59uhb",{enableRightClick: true}), true);
  var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3", {width: 150, height: 150}), true);

  window.onload = function () {
    // Вставка апплетов на страницу
    controller.inject("controller")
    poincare.inject("poincare");
    ellips0.inject("ellips0");
    ellips1.inject("ellips1");
    ellips2.inject("ellips2");
  };

// Глобальная переменная, чтобы следить за загрузкой апплетов
let appletsLoaded = {
  controller: false,
  poincare: false,
  ellips0: false,
  ellips1: false,
  ellips2: false
};

function ggbOnInit(param) {
	console.log(`Апплет загружен: ${param}`);
	if (param in appletsLoaded) {
        appletsLoaded[param] = true;	
	    checkAllAppletsLoaded();
    }
}
function checkAllAppletsLoaded() {
    if (Object.values(appletsLoaded).every(loaded => loaded)) {
        console.log("Все апплеты загружены! Запускаю настройку...");
        setupAll();
  }
}    

function setupAll() {	
    poincare.setColor("P0", 0,0,0)
    poincare.setValue("phi1", 90)
    poincare.setValue("phi2", 90)
    ellips0.setColor("ellips", 0, 0, 0)

    setColors([
      { applet: controller, name: "paddle1" },
      { applet: controller, name: "th1" },
      { applet: poincare,   name: "P1" },
      { applet: poincare,   name: "P0P1"},
      { applet: ellips1,    name: "ellips"},  
    ], 0,100,255);

    setColors([
      { applet: controller, name: "paddle2" },
      { applet: controller, name: "th2" },
      { applet: poincare,   name: "P2" },
      { applet: poincare,   name: "P1P2"},
      { applet: ellips2,    name: "ellips"},  
    ], 100,100,80);    
	      
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
```javascript

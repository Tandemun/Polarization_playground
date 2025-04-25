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
    <div id="controller"></div>
    <div style="display: flex; gap: 0px; flex-wrap: wrap; justify-content: center;">
      <div id="ellips0"></div>
      <div id="ellips1"></div>
      <div id="ellips2"></div>
      <div id="ellips3"></div>
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
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }

  function syncColor(sourceApplet, sourceObjectName, targetApplet, targetObjectName) {
    try {
      const hexColor = sourceApplet.getColor(sourceObjectName); // Получаем цвет
      const [r, g, b] = hexToRgb(hexColor); // Преобразуем в RGB
      targetApplet.setColor(targetObjectName, r, g, b); // Синхронизируем цвет
      console.log(`Synced color from ${sourceObjectName} to ${targetObjectName}: RGB(${r}, ${g}, ${b})`);
    } catch (e) {
      console.error(`Error syncing color:`, e);
    }
  }

  function syncCoords(sourceApplet, sourcePointName, targetApplet, targetObjectName) {
    try {
      const x = sourceApplet.getXcoord(sourcePointName);
      const y = sourceApplet.getYcoord(sourcePointName);
      const z = sourceApplet.getZcoord(sourcePointName);
      targetApplet.setCoords(targetObjectName, x, y, z);
      console.log(`Synced coords from ${sourcePointName} to ${targetObjectName}: [${x}, ${y}, ${z}]`);
    } catch (e) {
      console.error(`Error syncing coords:`, e);
    }
  }

  function syncValue(sourceApplet, sourceObjectName, targetApplet,targetObjectName) {
    // get value from controller and set value in poincare
	const value = 2*sourceApplet.getValue(sourceObjectName);/* Multiple by 2 due to double of angles on the Poincare sphere */
	targetApplet.setValue(targetObjectName, value);
	console.log(`Updated ${targetObjectName} in Poincare: ${value}`);
  } 
  
  function ggbOnInit(param) {
	  if (param == "controller") {
		  // init update listeners for controller
      controller.registerObjectUpdateListener("α", () => syncValue(controller, "α", poincare, "α"));
      controller.registerObjectUpdateListener("β", () => syncValue(controller, "β", poincare, "β"));
      controller.registerObjectUpdateListener("γ", () => syncValue(controller, "γ", poincare, "γ"));
	  }    
    
    if (param === "poincare") {
      // Регистрация listener'ов для обновления
      poincare.registerObjectUpdateListener("P0", () => syncCoords(poincare, "P0", ellips0, "S"));
      poincare.registerObjectUpdateListener("P1", () => syncCoords(poincare, "P1", ellips1, "S"));
      poincare.registerObjectUpdateListener("P2", () => syncCoords(poincare, "P2", ellips2, "S"));
      poincare.registerObjectUpdateListener("P3", () => syncCoords(poincare, "P3", ellips3, "S"));

      // Увеличение времени ожидания перед синхронизацией
      setTimeout(() => {
        // Инициализация синхронизации цветов и координат
        syncColor(poincare, "P0", ellips0, "ellips");
        syncColor(poincare, "P1", ellips1, "ellips");
        syncColor(poincare, "P2", ellips2, "ellips");
        syncColor(poincare, "P3", ellips3, "ellips");

        syncCoords(poincare, "P0", ellips0, "S");
        syncCoords(poincare, "P1", ellips1, "S");
        syncCoords(poincare, "P2", ellips2, "S");
        syncCoords(poincare, "P3", ellips3, "S");
      }, 30); // delay 30 ms to upload all
    }
  }
  
  // Создание апплетов с уникальными идентификаторами
  var controller = new GGBApplet(createGGBParams("ggbApplet1", "pts6vg4r"), true);
  var poincare = new GGBApplet(createGGBParams("poincare", "hdmsanwn",{enableRightClick: true}), true);
  var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips3 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3", {width: 150, height: 150}), true);

  window.onload = function () {
    // Вставка апплетов на страницу
    controller.inject("controller")
    poincare.inject("poincare");
    ellips0.inject("ellips0");
    ellips1.inject("ellips1");
    ellips2.inject("ellips2");
    ellips3.inject("ellips3");
  };
  

</script>


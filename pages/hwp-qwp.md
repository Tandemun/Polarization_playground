---
layout: default
title: 3-Paddle Polarization Controller
---
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
  <div id="poincare"></div>
</div>
<div style="display: flex; gap: 0px; flex-wrap: wrap; justify-content: center;">
  <div id="ellips0"></div>
  <div id="ellips1"></div>
  <div id="ellips2"></div>
  <div id="ellips3"></div>
</div>

<script>
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }  

  function syncColor(pointName, targetApplet, targetObject) {
    const hexColor = ggbApplet1.getColor(pointName);  // Получаем цвет в HEX
    const rgbColor = hexToRgb(hexColor);  // Преобразуем в RGB
    targetApplet.setColor(targetObject, rgbColor[0], rgbColor[1], rgbColor[2]);
    console.log(`Synced color for ${pointName} to ${targetObject}: RGB(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`);
  }
  
  function ggbOnInit(param) {
    if (param === "poincare") {
      poincare.registerObjectUpdateListener("P0", () => syncVector("P0", ellips0));
      poincare.registerObjectUpdateListener("P1", () => syncVector("P1", ellips1));
      poincare.registerObjectUpdateListener("P2", () => syncVector("P2", ellips2));
      poincare.registerObjectUpdateListener("P3", () => syncVector("P3", ellips3));
    }
  }

  function syncVector(pointName, targetApplet) {
    try {
      const x = poincare.getXcoord(pointName);
      const y = poincare.getYcoord(pointName);
      const z = poincare.getZcoord(pointName);
      console.log(`${pointName} updated: [${x}, ${y}, ${z}]`);
      targetApplet.setCoords("S", x, y, z);
    } catch (e) {
      console.error(`Error syncing ${pointName} to target applet:`, e);
    }
  }
  var applet1 = new GGBApplet(createGGBParams("poincare", "hdmsanwn"), true);
  var applet2 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3",{width: 150, height: 150}), true);
  var applet3 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3",{width: 150, height: 150}), true);
  var applet4 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3",{width: 150, height: 150}), true);
  var applet5 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3",{width: 150, height: 150}), true);

  window.onload = function () {
    applet1.inject("poincare");
    applet2.inject("ellips0");
    applet3.inject("ellips1");
    applet4.inject("ellips2");
    applet5.inject("ellips3");
    
    // Подождать немного, пока все апплеты инициализируются
    setTimeout(() => {
      // Синхронизация цвета при загрузке страницы
      syncColor("P0", ellips0, "ellips");
      syncColor("P1", ellips1, "ellips");
      syncColor("P2", ellips2, "ellips");
      syncColor("P3", ellips3, "ellips");

      // Инициализация листенеров для точек P0, P1 и P2
      syncVector("P0", ellips0, "S");
      syncVector("P1", ellips1, "S");
      syncVector("P2", ellips2, "S");
      syncVector("P3", ellips3, "S");
    }, 1000); // 1 секунда задержки на загрузку — можно уменьшить/увеличить
  };
</script>

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
      const hexColor = sourceApplet.getColor(sourceObjectName);
      const [r, g, b] = hexToRgb(hexColor);
      targetApplet.setColor(targetObjectName, r, g, b);
      console.log(`Synced color from ${sourceObjectName} to ${targetObjectName}: RGB(${r}, ${g}, ${b})`);
    } catch (e) {
      console.error(`Error syncing color:`, e);
    }
  }

  function syncCoords(sourceApplet, sourcePointName, targetApplet, targetPointName) {
    try {
      const x = sourceApplet.getXcoord(sourcePointName);
      const y = sourceApplet.getYcoord(sourcePointName);
      const z = sourceApplet.getZcoord(sourcePointName);
      targetApplet.setCoords(targetPointName, x, y, z);
      console.log(`Synced coords from ${sourcePointName} to ${targetPointName}: [${x}, ${y}, ${z}]`);
    } catch (e) {
      console.error(`Error syncing coords:`, e);
    }
  }

  function ggbOnInit(param) {
    if (param === "poincare") {
      poincare.registerObjectUpdateListener("P0", () => syncCoords(poincare, "P0", ellips0, "S"));
      poincare.registerObjectUpdateListener("P1", () => syncCoords(poincare, "P1", ellips1, "S"));
      poincare.registerObjectUpdateListener("P2", () => syncCoords(poincare, "P2", ellips2, "S"));
      poincare.registerObjectUpdateListener("P3", () => syncCoords(poincare, "P3", ellips3, "S"));
    }
  }

  var poincare = new GGBApplet(createGGBParams("poincare", "hdmsanwn"), true);
  var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3", {width: 150, height: 150}), true);
  var ellips3 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3", {width: 150, height: 150}), true);

  window.onload = function () {
    poincare.inject("poincare");
    ellips0.inject("ellips0");
    ellips1.inject("ellips1");
    ellips2.inject("ellips2");
    ellips3.inject("ellips3");

    setTimeout(() => {
      syncColor(poincare, "P0", ellips0, "ellips");
      syncColor(poincare, "P1", ellips1, "ellips");
      syncColor(poincare, "P2", ellips2, "ellips");
      syncColor(poincare, "P3", ellips3, "ellips");

      syncCoords(poincare, "P0", ellips0, "S");
      syncCoords(poincare, "P1", ellips1, "S");
      syncCoords(poincare, "P2", ellips2, "S");
      syncCoords(poincare, "P3", ellips3, "S");
    }, 1000);
  };
</script>

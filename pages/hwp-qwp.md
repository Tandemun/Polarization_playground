<script>
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }

  function syncColor(sourceObjectName, targetApplet) {
    try {
      const hexColor = poincare.getColor(sourceObjectName);
      const [r, g, b] = hexToRgb(hexColor);
      targetApplet.setColor("ellips", r, g, b);
      console.log(`Synced color from ${sourceObjectName} to ${targetApplet}: RGB(${r}, ${g}, ${b})`);
    } catch (e) {
      console.error(`Error syncing color:`, e);
    }
  }

  function syncCoords(sourcePointName, targetApplet) {
    try {
      const x = poincare.getXcoord(sourcePointName);
      const y = poincare.getYcoord(sourcePointName);
      const z = poincare.getZcoord(sourcePointName);
      targetApplet.setCoords("S", x, y, z);
      console.log(`Synced coords from ${sourcePointName} to ${targetApplet}: [${x}, ${y}, ${z}]`);
    } catch (e) {
      console.error(`Error syncing coords:`, e);
    }
  }

  function ggbOnInit(param) {
    if (param === "poincare") {
      poincare.registerObjectUpdateListener("P0", () => syncCoords("P0", ellips0));
      poincare.registerObjectUpdateListener("P1", () => syncCoords("P1", ellips1));
      poincare.registerObjectUpdateListener("P2", () => syncCoords("P2", ellips2));
      poincare.registerObjectUpdateListener("P3", () => syncCoords("P3", ellips3));
    }
  }

  var applet1 = new GGBApplet(createGGBParams("poincare", "hdmsanwn"), true);
  var applet2 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3", {width: 150, height: 150}), true);
  var applet3 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3", {width: 150, height: 150}), true);
  var applet4 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3", {width: 150, height: 150}), true);
  var applet5 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3", {width: 150, height: 150}), true);

  window.onload = function () {
    applet1.inject("poincare");
    applet2.inject("ellips0");
    applet3.inject("ellips1");
    applet4.inject("ellips2");
    applet5.inject("ellips3");

    setTimeout(() => {
      syncColor("P0", ellips0);
      syncColor("P1", ellips1);
      syncColor("P2", ellips2);
      syncColor("P3", ellips3);

      syncCoords("P0", ellips0);
      syncCoords("P1", ellips1);
      syncCoords("P2", ellips2);
      syncCoords("P3", ellips3);
    }, 1000);
  };
</script>

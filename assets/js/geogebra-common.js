function createGGBParams(id, material_id, overrides = {}) {
  return {
    id,
    //width: 600,
    //height: 600,
    showMenuBar: false,
    showAlgebraInput: false,
    showToolBar: false,
    showToolBarHelp: false,
    showResetIcon: false,
    enableLabelDrags: false,
    enableShiftDragZoom: false,
    enableRightClick: false,
    errorDialogsActive: false,
    useBrowserForJS: true,
    allowStyleBar: false,
    preventFocus: false,
    showZoomButtons: false,
    showFullscreenButton: false,
    capturingThreshold: 3,
    scale: 1,
    disableAutoScale: true,
    allowUpscale: false,
    clickToLoad: false,
    appName: "classic",
    buttonRounding: 0.7,
    buttonShadows: false,
    language: "en",
    material_id,
    // use this instead of material_id to load a .ggb file
	  // "filename":"myfile.ggb",
    ...overrides
  };
}

const solarizedColors = {
  base03: "#002b36",
  base02: "#073642",
  base01: "#586e75",
  base00: "#657b83",
  base0:  "#839496",
  base1:  "#93a1a1",
  base2:  "#eee8d5",
  base3:  "#fdf6e3",
  yellow: "#b58900",
  orange: "#cb4b16",
  red:    "#dc322f",
  magenta:"#d33682",
  violet: "#6c71c4",
  blue:   "#268bd2",
  cyan:   "#2aa198",
  green:  "#859900"
};


function hexToRgb(color) {
  // Если это css-переменная
  if (color.startsWith('--')) {
    color = getComputedStyle(document.documentElement).getPropertyValue(color).trim();
  }

  // Если это стандартное имя цвета
  if (!color.startsWith('#') && !/^[0-9a-f]{6}$/i.test(color)) {
    // Создаём временный элемент, чтобы спросить браузер
    let dummy = document.createElement('div');
    dummy.style.color = color;
    document.body.appendChild(dummy);
    let computedColor = getComputedStyle(dummy).color;
    document.body.removeChild(dummy);

    // computedColor будет типа "rgb(255, 255, 255)"
    let match = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    } else {
      throw new Error(`Cannot parse color: ${color}`);
    }
  }

  // Если это hex
  if (color.startsWith('#')) {
    color = color.slice(1);
  }

  if (!/^[0-9a-f]{6}$/i.test(color)) {
    throw new Error(`Invalid hex color: ${color}`);
  }

  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  return [r, g, b];
}


function setColors(mapping, color) {
    const [r, g, b] = hexToRgb(color);
    mapping.forEach(function(item) {
        item.applet.setColor(item.name, r, g, b);
    });
}
  
function syncColor(sourceApplet, sourceObjectName, targetApplet, targetObjectName) {
    try {
      const hexColor = sourceApplet.getColor(sourceObjectName);
      const [r, g, b] = hexToRgb(hexColor); 
      targetApplet.setColor(targetObjectName, r, g, b);
      //console.log(`Synced color from ${sourceObjectName} to ${targetObjectName}: RGB(${r}, ${g}, ${b})`);
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
      //console.log(`Synced coords from ${sourcePointName} to ${targetObjectName}: [${x}, ${y}, ${z}]`);
    } catch (e) {
      console.error(`Error syncing coords:`, e);
    }
  }

  function syncValue(sourceApplet, sourceObjectName, targetApplet,targetObjectName) {
    // get value from controller and set value in poincare
	const value = sourceApplet.getValue(sourceObjectName);
	targetApplet.setValue(targetObjectName, value);
	//console.log(`Updated ${targetObjectName} in Poincare: ${value}`);
  }

const modes = {
    full: {
        true: ["P0", "P1", "P2", "P3", "P0P1","P1P2", "P2P3","A11","A12","A21","A22","A31","A32"],
        false: []
    },
    threePoints: {
        true: ["P0", "P1", "P2", "P0P1","P1P2", "A11","A12","A21","A22"],
        false: ["P3", "P2P3","A31","A32"]
    },
    twoPoints: {
        true: ["P0", "P1", "P0P1","A11","A12"],
        false: ["P2", "P3", "P1P2", "P2P3","A21","A22","A31","A32"]
    }
};

function setMode(applet, modeName) {
    const mode = modes[modeName];
    if (!mode) {console.error(`Режим ${modeName} не найден`); return;}
    mode.true.forEach(objName => applet.setVisible(objName, true));
    mode.false.forEach(objName => applet.setVisible(objName, false));
  }

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

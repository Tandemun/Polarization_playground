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


function getCssVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}


function hexToRgb(color) {
  if (color.startsWith('--')) color = getComputedStyle(document.documentElement).getPropertyValue(color).trim();
	
  if (!/^#?[0-9a-f]{6}$/i.test(color)) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillStyle = color;
    if (ctx.fillStyle === '#000000' && color.toLowerCase() !== 'black') {
      console.log(`Error: Unknown color name: ${color}`);
      throw new Error(`Unknown color name: ${color}`);
    }
    color = ctx.fillStyle;
  }

  if (color.startsWith('#')) color = color.slice(1);

  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return [r, g, b];
}


function setColors(applet, colorMapping) {
    // Проходим по объекту colorMapping, где ключ — это цвет, а значение — массив с именами объектов
    for (const [color, names] of Object.entries(colorMapping)) {
        // Преобразуем цвет из hex в RGB
        const [r, g, b] = hexToRgb(color);

        // Проходим по именам объектов и задаем цвет
        names.forEach(name => {
            applet.setColor(name, r, g, b);
        });
    }
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



function createAppletControls(applet, variableNames, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = ''; // Clear container

  const sliders = [];
  const checkboxes = [];
  const valueDisplays = [];

  const controlsWrapper = document.createElement('div');
  controlsWrapper.style.display = 'flex';
  controlsWrapper.style.alignItems = 'center';
  controlsWrapper.style.gap = '2rem';
  controlsWrapper.style.justifyContent = 'space-evenly';
  container.appendChild(controlsWrapper);

  variableNames.forEach((name, index) => {
    const controlGroup = document.createElement('div');
    controlGroup.style.display = 'flex';
    controlGroup.style.alignItems = 'center';
    

    // Create value display
    const valueDisplay = document.createElement('div');
    valueDisplay.textContent = '0';
    valueDisplay.style.fontFamily = 'monospace';
    valueDisplay.style.fontSize = '1rem';
    valueDisplay.style.display = 'inline-block';
    valueDisplay.style.width = '4ch';  // 4 символа шириной
    valueDisplay.style.textAlign = 'right';  // чтобы числа красиво выравнивались по правому краю
	  
    // Create slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = -90;
    slider.max = 90;
    slider.value = 0;
    slider.id = `slider_${name}`;
    slider.style.width = '160px';



    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox_${name}`;

    controlGroup.appendChild(valueDisplay);
    controlGroup.appendChild(slider);
    controlGroup.appendChild(checkbox);
	  
    controlsWrapper.appendChild(controlGroup);

    sliders.push(slider);
    checkboxes.push(checkbox);
    valueDisplays.push(valueDisplay);
  });

  function updateApplet(index, value) {
    const varName = variableNames[index];
    applet.setValue(varName, value);
  }

  function handleSliderInput(index) {
    return function(event) {
      const value = parseFloat(event.target.value);
      valueDisplays[index].textContent = value;

      const linkedIndices = checkboxes
        .map((cb, i) => (cb.checked ? i : null))
        .filter(i => i !== null);

      if (linkedIndices.length > 1 && checkboxes[index].checked) {
        linkedIndices.forEach(i => {
          sliders[i].value = value;
          valueDisplays[i].textContent = value;
          updateApplet(i, value);
        });
      } else {
        updateApplet(index, value);
      }
    };
  }

  sliders.forEach((slider, i) => {
    slider.addEventListener('input', handleSliderInput(i));
  });
}


function createPoincareSettings(applet, variableNames, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = ''; // Clear container

  const sliders = [];
  const checkboxes = [];
  const valueDisplays = [];

  const controlsWrapper = document.createElement('div');
  controlsWrapper.style.display = 'flex';
  controlsWrapper.style.alignItems = 'center';
  controlsWrapper.style.gap = '2rem';
  controlsWrapper.style.justifyContent = 'space-evenly';
  container.appendChild(controlsWrapper);

  variableNames.forEach((name, index) => {
    const controlGroup = document.createElement('div');
    controlGroup.style.display = 'flex';
    controlGroup.style.alignItems = 'center';
    

    // Create value display
    const valueDisplay = document.createElement('div');
    valueDisplay.textContent = '0';
    valueDisplay.style.fontFamily = 'monospace';
    valueDisplay.style.fontSize = '1rem';
    valueDisplay.style.display = 'inline-block';
    valueDisplay.style.width = '4ch';  // 4 символа шириной
    valueDisplay.style.textAlign = 'right';  // чтобы числа красиво выравнивались по правому краю
	  
    // Create slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = -90;
    slider.max = 90;
    slider.value = 0;
    slider.id = `slider_${name}`;
    slider.style.width = '160px';



    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox_${name}`;

    controlGroup.appendChild(valueDisplay);
    controlGroup.appendChild(slider);
    controlGroup.appendChild(checkbox);
	  
    controlsWrapper.appendChild(controlGroup);

    sliders.push(slider);
    checkboxes.push(checkbox);
    valueDisplays.push(valueDisplay);
  });

  function updateApplet(index, value) {
    const varName = variableNames[index];
    applet.setValue(varName, value);
  }

  function handleSliderInput(index) {
    return function(event) {
      const value = parseFloat(event.target.value);
      valueDisplays[index].textContent = value;

      const linkedIndices = checkboxes
        .map((cb, i) => (cb.checked ? i : null))
        .filter(i => i !== null);

      if (linkedIndices.length > 1 && checkboxes[index].checked) {
        linkedIndices.forEach(i => {
          sliders[i].value = value;
          valueDisplays[i].textContent = value;
          updateApplet(i, value);
        });
      } else {
        updateApplet(index, value);
      }
    };
  }

  sliders.forEach((slider, i) => {
    slider.addEventListener('input', handleSliderInput(i));
  });
}











function createPoincareControl(applet, variableNames, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = ''; // Clear container

  const checkboxes = [];

  const controlsWrapper = document.createElement('div');
  controlsWrapper.style.display = 'flex';
  controlsWrapper.style.alignItems = 'center';
  controlsWrapper.style.gap = '2rem';
  container.appendChild(controlsWrapper);

  variableNames.forEach((name, index) => {
    const controlGroup = document.createElement('div');
    controlGroup.style.display = 'flex';
    controlGroup.style.flexDirection = 'column';
    controlGroup.style.alignItems = 'center';
    controlGroup.style.gap = '0.5rem';

    // Create checkbox
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.gap = '0.5rem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox_${name}`;
    checkbox.dataset.varname = name;        // Запоминаем имя переменной
    //checkbox.dataset.appletid = applet.id;   // Запоминаем id апплета
    checkbox.addEventListener('input', handleCheckboxInput);

    const checkboxText = document.createElement('span');
    checkboxText.textContent = 'trace';

    label.appendChild(checkbox);
    label.appendChild(checkboxText);

    controlGroup.appendChild(label);
    controlsWrapper.appendChild(controlGroup);
    checkboxes.push(checkbox);
  });

  function handleCheckboxInput(event) {
      const checkbox = event.target;
      const varName = checkbox.dataset.varname;
      const appletId = checkbox.dataset.appletid;
      const value = checkbox.checked;
      console.log(`Chekbox for applet ${applet} for ${varName} is changed to ${value}`);
      applet.setTrace(varName, value)
  }
}



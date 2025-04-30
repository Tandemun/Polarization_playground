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
  // get object color from source applet and set it in a target applet  
  try {
      const hexColor = sourceApplet.getColor(sourceObjectName);
      const [r, g, b] = hexToRgb(hexColor); 
      targetApplet.setColor(targetObjectName, r, g, b);
    } catch (e) {
      console.error(`Error syncing color:`, e);
    }
  }

  function syncCoords(sourceApplet, sourcePointName, targetApplet, targetObjectName) {
    // get vector or point coordinates from source applet and set them in a target applet
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
    // get value from source applet and set value in a target applet
	  try {  
      const value = sourceApplet.getValue(sourceObjectName);
	    targetApplet.setValue(targetObjectName, value);
    }catch(e){
	    console.error(`Error syncing values:`, e);
    }
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
    console.log("All applets are loaded! Strat initial setup:");
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
  controlsWrapper.style.justifyContent = 'space-between';
  container.appendChild(controlsWrapper);

  variableNames.forEach((name, index) => {
    const controlGroup = document.createElement('div');
    controlGroup.style.alignItems = 'center';
    controlGroup.style.width = '100%';

    // Create slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = -90;
    slider.max = 90;
    slider.value = 0;
    slider.id = `slider_${name}`;
    slider.style.width = '100%';	
    controlGroup.appendChild(slider);

    const bottomRow = document.createElement('div');
    bottomRow.style.alignItems = 'center';
    bottomRow.style.display = 'flex';
    bottomRow.style.justifyContent = 'space-between';
    controlGroup.appendChild(bottomRow);
    
    // Create value display
    const valueDisplayLabel = document.createElement('div');
    valueDisplayLabel.textContent = 'angle: ';
    bottomRow.appendChild(valueDisplayLabel);
    const valueDisplay = document.createElement('output');
    valueDisplay.textContent = '0';
    valueDisplayLabel.appendChild(valueDisplay);

    // Create checkbox
    const checkboxLabel = document.createElement('div');
    checkboxLabel.textContent = 'bound';
    bottomRow.appendChild(checkboxLabel);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox_${name}`;
    checkboxLabel.appendChild(checkbox);
	  
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
  console.log(`Create poincare settings for ${applet}`)
	
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const details = document.createElement('details');
  container.appendChild(details);

  const summary = document.createElement('summary');
  summary.className = 'poincare-settings__summary'
  summary.textContent = 'Settings';
  details.appendChild(summary);

  const menu = document.createElement('div');
  menu.className = 'poincare-settings__menu';
  details.appendChild(menu);

  const pointsSection = document.createElement('div');
  pointsSection.className = 'poincare-settings__pointsSection'
  menu.appendChild(pointsSection);

  variableNames.forEach(name => {
    console.log('Creating column for ${name}')
    
    const pointColumn = document.createElement('div');
    pointColumn.className = 'poincare-settings__point-column';

    console.log(`Creating label checkbox for ${name}`)
    const label = document.createElement('label');
    const labelCheckbox = document.createElement('input');
    labelCheckbox.type = 'checkbox';
    labelCheckbox.dataset.varname = name;
    labelCheckbox.id = `trace_${name}`;
    labelCheckbox.addEventListener('input', () => {applet.setLabelVisible?.(name, labelCheckbox.checked); });
    label.appendChild(labelCheckbox);
    label.appendChild(document.createTextNode(' label'));

    console.log(`Creating trace checkbox for ${name}`)
    const trace = document.createElement('label');
    const traceCheckbox = document.createElement('input');
    traceCheckbox.type = 'checkbox';
    traceCheckbox.dataset.varname = name;
    traceCheckbox.id = `trace_${name}`;
    traceCheckbox.addEventListener('input', () => {applet.setTrace?.(`${name}trace`, traceCheckbox.checked);});
    trace.appendChild(traceCheckbox);
    trace.appendChild(document.createTextNode(' trace'));

    pointColumn.appendChild(document.createTextNode(name));
    pointColumn.appendChild(label);
    pointColumn.appendChild(trace);

    pointsSection.appendChild(pointColumn);
  });

  const generalSection = document.createElement('div');
  generalSection.className = 'poincare-settings__general'
  menu.appendChild(generalSection);

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear all traces';
  clearBtn.addEventListener('click', () => {
	  console.log('Trace clear button clicked')
    //applet.ZoomIn(-1, 1);
  });

  const axisLabel = document.createElement('label');
  const axisCb = document.createElement('input');
  axisCb.type = 'checkbox';
  axisCb.addEventListener('input', () => applet.setAxesVisible?.(-1,axisCb.checked,axisCb.checked,axisCb.checked));
  axisLabel.appendChild(axisCb);
  axisLabel.appendChild(document.createTextNode(' show axis'));

  const gridLabel = document.createElement('label');
  const gridCb = document.createElement('input');
  gridCb.type = 'checkbox';
  gridCb.addEventListener('input', () => applet.setGridVisible?.(-1,gridCb.checked));
  gridLabel.appendChild(gridCb);
  gridLabel.appendChild(document.createTextNode(' show grid'));

  generalSection.appendChild(clearBtn);
  generalSection.appendChild(axisLabel);
  generalSection.appendChild(gridLabel);
}


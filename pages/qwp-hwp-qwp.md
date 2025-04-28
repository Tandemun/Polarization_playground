---
layout: default
title: 3-Paddle Polarization Controller
---

<h1>Interactive Model of a 3-Paddle Polarization Controller</h1>
<h2>3-Paddle Polarization Controller</h2>
<p>This is a model of a classical manual 3-paddle polarization controller. Use the sliders to adjust paddle rotation angles α, β, and γ.</p>
<h2>State of Polarization</h2>
<p>This visualization shows the evolution of the state of polarization (SOP) at different stages within the controller. The top displays the Poincaré sphere, while the bottom shows the corresponding polarization ellipses.</p>

<div id="controls1" style="width: 800px; height: 40px;"></div>
<div class="applet" id="controller"></div>
<div class="applet" id="poincare"></div>
<div id="controls2" style="width: 800px; height: 100px;"></div>
<div style="display: flex; gap: 0px; flex-wrap: wrap; justify-content: center;">
    <div id="ellips0"></div>
    <div id="ellips1"></div>
    <div id="ellips2"></div>
    <div id="ellips3"></div>
</div>


<script>  
    var controller = new GGBApplet(createGGBParams("controller", "twr2vny4"), true);
    var poincare = new GGBApplet(createGGBParams("poincare", "rvbafww5",{enableRightClick: false}), true);
    var ellips0 = new GGBApplet(createGGBParams("ellips0", "ar9nzxm3"), true);
    var ellips1 = new GGBApplet(createGGBParams("ellips1", "ar9nzxm3"), true);
    var ellips2 = new GGBApplet(createGGBParams("ellips2", "ar9nzxm3"), true);
    var ellips3 = new GGBApplet(createGGBParams("ellips3", "ar9nzxm3"), true);

    window.onload = function () {
        controller.inject("controller")
        poincare.inject("poincare");
        ellips0.inject("ellips0");
        ellips1.inject("ellips1");
        ellips2.inject("ellips2");
        ellips3.inject("ellips3");
    };

    let appletsLoaded = {
        controller: false,
        poincare: false,
        ellips0: false,
        ellips1: false,
        ellips2: false,
        ellips3: false  
    };


    function setupAll() {	
        console.log("Staring initial setup");
        setMode(poincare, "full");
        poincare.setValue("phi1", 90)
        poincare.setValue("phi2", 180)
        poincare.setValue("phi3", 90)
        createAppletControls(controller, ['th1', 'th2', 'th3'], 'controls1');
        createPoincareControl(poincare, ['P0trace', 'P1trace', 'P2trace','P3trace'], 'controls2')
	
        console.log("Set background colors for applets");
        const bgColor = getCssVariable("--base3")
        controller.setGraphicsOptions(-1,{"bgColor":bgColor});
        controller.setGraphicsOptions(1,{"bgColor":bgColor});
        poincare.setGraphicsOptions(-1,{"bgColor":bgColor});
        poincare.setGraphicsOptions(1,{"bgColor":bgColor});
        ellips0.setGraphicsOptions(1,{"bgColor":bgColor});
        ellips1.setGraphicsOptions(1,{"bgColor":bgColor});
        ellips2.setGraphicsOptions(1,{"bgColor":bgColor});
        ellips3.setGraphicsOptions(1,{"bgColor":bgColor});
	
      
        console.log("4");
	setColors(controller,{
            "--orange": ["paddle1", "paddle3"],
            "--blue":   ["paddle2"],
        });
	setColors(poincare,{
	    [bgColor]:  ["sphere"],
            "black":    ["P0","P0trace"],
            "--orange": ["P1", "P1trace", "P0P1", "A11", "A12", "P3", "P3trace", "P2P3", "A31", "A32"],
            "--blue":   ["P2", "P2trace", "P1P2", "A21", "A22"],
        });        
	    
        setColors(ellips0,{"black":   ["ellips"]});
        setColors(ellips1,{"--orange":["ellips"]});
        setColors(ellips2,{"--blue":  ["ellips"]});
        setColors(ellips3,{"--orange":["ellips"]});
	      
        syncValue(controller, "th1", poincare, "th1");
        syncValue(controller, "th2", poincare, "th2");
        syncValue(controller, "th3", poincare, "th3");
        controller.registerObjectUpdateListener("th1", () => syncValue(controller, "th1", poincare, "th1"));
        controller.registerObjectUpdateListener("th2", () => syncValue(controller, "th2", poincare, "th2"));
        controller.registerObjectUpdateListener("th3", () => syncValue(controller, "th3", poincare, "th3"));
    
        syncCoords(poincare, "P0", ellips0, "S");
        syncCoords(poincare, "P1", ellips1, "S");
        syncCoords(poincare, "P2", ellips2, "S"); 
        syncCoords(poincare, "P3", ellips3, "S");
        poincare.registerObjectUpdateListener("P0", () => syncCoords(poincare, "P0", ellips0, "S"));
        poincare.registerObjectUpdateListener("P1", () => syncCoords(poincare, "P1", ellips1, "S"));
        poincare.registerObjectUpdateListener("P2", () => syncCoords(poincare, "P2", ellips2, "S"));   
        poincare.registerObjectUpdateListener("P3", () => syncCoords(poincare, "P3", ellips3, "S"));
}	
</script>


import { InvokeClearFog, InvokeClearAllFog } from '../session.js';
import { fogSliderValue } from '../gmScripts/sliders.js'
import { DisableDrawingFog } from '../gmScripts/drawFog.js';
import { AreInteractionsEnabled } from '../gmScripts/interactionsSettings.js';

//fog removal's code
let isClearingFog = false;
let fogCanvas = document.getElementById('fogCanvas');

function SetClearingFog() {
    //disable drawing fog

    if (isClearingFog) {
        fogCanvas.removeEventListener('mousedown', StartClearingFog);
        fogCanvas.style.pointerEvents = "none";
    }
    else {
        fogCanvas.addEventListener('mousedown', StartClearingFog);
        fogCanvas.addEventListener('mouseup', StopClearingFog);
        fogCanvas.style.pointerEvents = "auto";
    }
    isClearingFog = !isClearingFog;
    DisableDrawingFog();
}

export function DisableClearingFog() {
    if (isClearingFog) {
        fogCanvas.removeEventListener('mousedown', StartClearingFog);
        fogCanvas.removeEventListener('mousemove', ClearFog);
        isClearingFog = false;
    }
}

function StartClearingFog() {
    fogCanvas.addEventListener('mousemove', ClearFog);
}

function StopClearingFog() {
    fogCanvas.removeEventListener('mousemove', ClearFog);
}

function ClearFog(e) {
    e = e || window.event;
    e.preventDefault();

    let mapBorder = fogCanvas.getBoundingClientRect();

    let fogCanvasContext = fogCanvas.getContext("2d");

    let x = e.clientX - mapBorder.left - fogSliderValue / 2;
    let y = e.clientY - mapBorder.top - fogSliderValue / 2;
    let width = fogSliderValue;
    let height = fogSliderValue;

    fogCanvasContext.clearRect(x, y, width, height);

    if (AreInteractionsEnabled()) {
        InvokeClearFog(x, y, width, height);
    }
}

function ClearAllFog() {
    DisableClearingFog();
    DisableDrawingFog();
    fogCanvas.getContext("2d").clearRect(0, 0, fogCanvas.width, fogCanvas.height);
    fogCanvas.style.pointerEvents = "none";

    if (AreInteractionsEnabled()) {
        InvokeClearAllFog();
    }
}

document.getElementById("clearFogBtn").addEventListener('click', SetClearingFog);
document.getElementById("clearAllFogBtn").addEventListener('click', ClearAllFog);
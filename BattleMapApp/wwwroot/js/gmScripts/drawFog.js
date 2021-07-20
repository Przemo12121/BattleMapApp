import { InvokeDrawFog, InvokeFogAllMap } from '../session.js';
import { fogSliderValue } from '../gmScripts/sliders.js'
import { DisableClearingFog } from '../gmScripts/clearFog.js';
import { AreInteractionsEnabled } from '../gmScripts/interactionsSettings.js';

// drawing fog code
//trigger for drawing/not drawing fog
let isDrawingFog = false;
let fogCanvas = document.getElementById('fogCanvas');
let modifyFogSubmit = document.getElementById('modifyFogSubmit');

function SetDrawingFog() {
    //disable clearing fog !!!

    if (isDrawingFog) {
        fogCanvas.removeEventListener('mousedown', StartDrawingFog);
        fogCanvas.style.pointerEvents = "none";
    }
    else {
        fogCanvas.addEventListener('mousedown', StartDrawingFog);
        fogCanvas.addEventListener('mouseup', StopDrawingFog);
        fogCanvas.style.pointerEvents = "auto";
    }
    isDrawingFog = !isDrawingFog;
    DisableClearingFog();
}

export function DisableDrawingFog() {
    if (isDrawingFog) {
        fogCanvas.removeEventListener('mousedown', StartDrawingFog);
        fogCanvas.removeEventListener('mousemove', DrawFog);
        isDrawingFog = false;
    }
}

function DrawFog(e) {
    e = e || window.event;
    e.preventDefault();

    let mapBorder = fogCanvas.getBoundingClientRect();

    let fogCanvasContext = fogCanvas.getContext("2d");
    fogCanvasContext.fillStyle = "grey";

    if (e.clientX < mapBorder.right && e.clientX > mapBorder.left &&
        e.clientY < mapBorder.bottom && e.clientY > mapBorder.top) {

        let x = e.clientX - mapBorder.left - fogSliderValue / 2;
        let y = e.clientY - mapBorder.top - fogSliderValue / 2;
        let width = fogSliderValue;
        let height = fogSliderValue;

        fogCanvasContext.fillRect(x, y, width, height);

        if (AreInteractionsEnabled()) {
            InvokeDrawFog(x, y, width, height);
        }
    }
}

function StartDrawingFog() {
    fogCanvas.addEventListener('mousemove', DrawFog);
}

function StopDrawingFog() {
    fogCanvas.removeEventListener('mousemove', DrawFog);
}

function FogAllMap() {
    DisableClearingFog();
    DisableDrawingFog();
    fogCanvas.getContext("2d").fillStyle = "gray";
    fogCanvas.getContext("2d").fillRect(0, 0, fogCanvas.width, fogCanvas.height);
    fogCanvas.style.pointerEvents = "none";

    if (AreInteractionsEnabled()) {
        InvokeFogAllMap();
    }
}

document.getElementById("drawFogBtn").addEventListener('click', SetDrawingFog);
document.getElementById("fogAllMapBtn").addEventListener('click', FogAllMap);
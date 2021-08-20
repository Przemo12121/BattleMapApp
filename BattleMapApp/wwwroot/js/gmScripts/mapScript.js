import { InvokeReload, InvokeSetScale, InvokeDrawGrid } from '../session.js';
import { EnableInteractions, DisableInteractions } from '../gmScripts/interactionsSettings.js';
import { SetScale, DrawGrid , ClearGrid} from '../mapScaling.js';

"use strict"

let backgroundMap = document.getElementById('backgroundMap');

let fileInput = document.getElementById('uploadMapInput');

function UploadNewMap() {
    fileInput.click();
    fileInput.addEventListener('change', UploadMap);

    function UploadMap() {
        let reader = new FileReader();

        let file = fileInput.files[0];

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            backgroundMap.src = reader.result;

            backgroundMap.onload = function () {    //resize fogCanvas to control fog correctly
                let fogCanvas = document.getElementById('fogCanvas');
                fogCanvas.style.width = backgroundMap.width + "px";
                fogCanvas.style.height = backgroundMap.height + "px";
                fogCanvas.width = fogCanvas.offsetWidth;
                fogCanvas.height = fogCanvas.offsetHeight;

                let gridCanvas = document.getElementById('gridCanvas');
                gridCanvas.style.width = backgroundMap.width + "px";
                gridCanvas.style.height = backgroundMap.height + "px";
                gridCanvas.width = gridCanvas.offsetWidth;
                gridCanvas.height = gridCanvas.offsetHeight;
            }
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    DisableInteractions();
}

function SendMapToServer() {
    let submit = document.getElementById('uploadMapSubmit');
    let fog = document.getElementById('fogCanvas').toDataURL("image/png");
    fog = fog.replace('data:image/png;base64,', '');

    document.getElementById('uploadFogInput').value = fog;

    submit.click();
}
document.getElementById('sendMapBtn').addEventListener('click', SendMapToServer);
document.getElementById('uploadMapBtn').addEventListener('click', UploadNewMap);

function GetResponse() {
    var myframe = document.getElementById('serverResponseIframe');
    var iframeDocument = myframe.contentDocument || myframe.contentWindow.document; // get access to DOM inside the iframe
    var content = iframeDocument.textContent || iframeDocument.body.textContent; // get text of iframe

    //handle server response here
    var json = JSON.parse(content);
    //document.getElementById('test2').textContent = "?!?!?";//json['test'];
    if (json['scope'] == 1) {
        InvokeReload();
        EnableInteractions();
    }
}
document.getElementById('serverResponseIframe').addEventListener('load', GetResponse);

function Scale(e) {
    e = e || window.event;
    e.preventDefault();

    let gridCanvas = document.getElementById('gridCanvas');
    gridCanvas.style.pointerEvents = "auto";

    let firstCoordX = 0;
    let firstCoordY = 0;
    let secondCoordX = 0;
    let secondCoordY = 0;
    let newScale = 1;
    let mapBorder = gridCanvas.getBoundingClientRect();


    gridCanvas.addEventListener('mousedown', MeasureDistanceFirst);
    gridCanvas.addEventListener('mouseup', MeasureDistanceSecond);

    let gridCanvasContext = gridCanvas.getContext('2d');
    let distanceInputDiv = document.getElementById('distanceInputDiv');

    function DrawLine(e) {
        ClearGrid();

        gridCanvasContext.beginPath();

        gridCanvasContext.lineWidth = 5;
        gridCanvasContext.lineCap = 'round';
        gridCanvasContext.strokeStyle = '#c0392b';

        gridCanvasContext.moveTo(firstCoordX, firstCoordY);
        gridCanvasContext.lineTo(e.clientX - mapBorder.left, e.clientY - mapBorder.top);

        gridCanvasContext.stroke();
    }

    function MeasureDistanceFirst(e) {//first point
        firstCoordX = e.clientX - mapBorder.left;
        firstCoordY = e.clientY - mapBorder.top;

        gridCanvas.addEventListener('mousemove', DrawLine);
        gridCanvas.removeEventListener('mousedown', MeasureDistanceFirst);
    }

    function MeasureDistanceSecond(e) {//second point
        secondCoordX = e.clientX - mapBorder.left;
        secondCoordY = e.clientY - mapBorder.top;

        //set pixels in dsitance
        newScale = Math.sqrt(Math.pow(secondCoordX - firstCoordX, 2) + Math.pow(secondCoordY - firstCoordY, 2));

        //show and position div cointaining input for distance in meters
        distanceInputDiv.hidden = false;
        distanceInputDiv.style.left = (firstCoordX + mapBorder.left + (secondCoordX - firstCoordX)/2 - 100) + "px";
        distanceInputDiv.style.top = (firstCoordY + mapBorder.top + (secondCoordY - firstCoordY) / 2 - 60) + "px";

        document.getElementById('distanceInputBtn').addEventListener('click', function () {
            let input = document.getElementById('distanceInputValue');
            if (input.value > 0) {
                newScale = newScale / input.value; //divide pixels per meter

                SetScale(newScale)

                InvokeSetScale(newScale);

                document.getElementById('pxPerDistanceInput').value = newScale
                distanceInputDiv.hidden = true; //hide div

                document.getElementById('scaleMapSubmit').click();
            }
        });
        gridCanvas.removeEventListener('mouseup', MeasureDistanceSecond);
        gridCanvas.removeEventListener('mousemove', DrawLine);
        gridCanvas.style.pointerEvents = "none";
    }
}
document.getElementById('scaleMapBtn').addEventListener('click', Scale);

function OrderDrawGrid() {
    DrawGrid();
    InvokeDrawGrid();
}
document.getElementById('gridBtn').addEventListener('click', OrderDrawGrid);
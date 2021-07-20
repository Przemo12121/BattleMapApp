﻿import { SetScale, DrawGrid } from '../js/mapScaling.js'

let userAccessString = document.getElementById("userAccessString").value;

let connection = new signalR.HubConnectionBuilder().withUrl("/sessionhub?AccessString=" + userAccessString).build();

connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("DrawGrid", function () {
    DrawGrid();
});

connection.on("SetScale", function (value) {
    SetScale(value);
});

connection.on("Reload", function () {
    document.getElementById('reloadSubmit').click();
});

connection.on("MoveToken", function (tokenId, newPosX, newPosY) {
    var tokenToMove = document.getElementById(tokenId);
    tokenToMove.style.left = newPosX + "px";
    tokenToMove.style.top = newPosY + "px";
});

connection.on("DrawFog", function (x, y, width, height) {
    var fogCanvas = document.getElementById("fogCanvas").getContext("2d");
    fogCanvas.fillStyle = "grey";
    fogCanvas.fillRect(x, y, width, height);
});

connection.on("FogAllMap", function () {
    var fogCanvas = document.getElementById("fogCanvas").getContext("2d");
    fogCanvas.fillStyle = "grey";
    fogCanvas.fillRect(0, 0, 1000, 600);
});

connection.on("ClearAllFog", function () {
    var fogCanvas = document.getElementById("fogCanvas").getContext("2d");
    fogCanvas.clearRect(0, 0, 1000, 600);
});


connection.on("ClearFog", function (x, y, width, height) {
    var fogCanvas = document.getElementById("fogCanvas").getContext("2d");
    fogCanvas.clearRect(x, y, width, height);
});

connection.on("ReceiveMap", function (serlizedMap) {
    
});

function InvokeSetScale(value) {
    connection.invoke("SetScale", value);
}

function InvokeMoveToken(tokenId, newPosX, newPosY) {
    connection.invoke("MoveToken", tokenId, newPosX, newPosY);
}

function InvokeDrawFog(x, y, width, height) {
    connection.invoke("DrawFog", x, y, width, height);
}

function InvokeClearFog(x, y, width, height) {
    connection.invoke("ClearFog", x, y, width, height);
}

function InvokeFogAllMap() {
    connection.invoke("FogAllMap");
}

function InvokeClearAllFog() {
    connection.invoke("ClearAllFog");
}

function InvokeReload() {
    connection.invoke("Reload");
}

function InvokeDrawGrid() {
    connection.invoke("DrawGrid");
}

export { InvokeMoveToken, InvokeClearFog, InvokeDrawFog, InvokeClearAllFog, InvokeFogAllMap, InvokeReload, InvokeSetScale, InvokeDrawGrid };
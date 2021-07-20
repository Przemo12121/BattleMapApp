let distanceUnitScale = document.getElementById('pxPerDistanceStoredValue').value; //in dnd one unit of distance is 1,5ft ~ 0,5m
let gridCanvas = document.getElementById('gridCanvas');
let gridCanvasContext = gridCanvas.getContext('2d');
let isGridShown = false;

function SetScale(value) {
    distanceUnitScale = value;
}

function DrawGrid() {
    ClearGrid();

    if (!isGridShown) {
        isGridShown = true;

        let maxHeight = gridCanvas.height;
        let maxWidth = gridCanvas.width;

        gridCanvasContext.lineWidth = 1;
        gridCanvasContext.lineCap = 'butt';
        gridCanvasContext.strokeStyle = '#000000';

        //vertical
        for (let i = 0; i < maxWidth; i += distanceUnitScale) {
            gridCanvasContext.beginPath();
            gridCanvasContext.moveTo(i, 0);
            gridCanvasContext.lineTo(i, maxHeight);
            gridCanvasContext.stroke();
        }

        //horizontal
        for (let i = 0; i < maxHeight; i += distanceUnitScale) {
            gridCanvasContext.beginPath();
            gridCanvasContext.moveTo(0, i);
            gridCanvasContext.lineTo(maxWidth, i);
            gridCanvasContext.stroke();
        }
    }
    else {
        isGridShown = false;
    }
}

function ClearGrid() {
    gridCanvasContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
}

export { SetScale, DrawGrid, ClearGrid };
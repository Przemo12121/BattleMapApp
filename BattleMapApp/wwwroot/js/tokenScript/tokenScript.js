import { InvokeMoveToken }  from '../session.js';

function MoveToken(token) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    token.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        var newPosX = (token.offsetLeft - pos1);
        var newPosY = (token.offsetTop - pos2);
        token.style.top = newPosY + "px";
        token.style.left = newPosX + "px";
        InvokeMoveToken(token.id, newPosX, newPosY);
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export { MoveToken };
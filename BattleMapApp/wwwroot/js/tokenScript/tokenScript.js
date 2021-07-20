import { InvokeMoveToken }  from '../session.js';

    //creating token
var token = document.createElement("div");
token.setAttribute("class", "token");
var tokenImage = new Image();
//tokenImage.src = "./Images/jatoken.png";
tokenImage.setAttribute("class", "tokenImage");
token.id = "token";
token.appendChild(tokenImage);

var token2 = document.createElement("div");
token2.setAttribute("class", "token");
var tokenImage2 = new Image();
//tokenImage2.src = "./Images/jatoken.png";
tokenImage2.setAttribute("class", "tokenImage");
token2.id = "token2";
token2.appendChild(tokenImage2);

    //adding token to mapDiv
mapDiv.appendChild(token);
mapDiv.appendChild(token2);

    //making token draggable
dragElement(token);
dragElement(token2);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    elmnt.onmousedown = dragMouseDown;

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
        var newPosX = (elmnt.offsetLeft - pos1);
        var newPosY = (elmnt.offsetTop - pos2);
        elmnt.style.top = newPosY + "px";
        elmnt.style.left = newPosX + "px";
        InvokeMoveToken(elmnt.id, newPosX, newPosY);
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
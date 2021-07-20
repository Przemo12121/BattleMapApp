function GmDivMoverMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    var gmToolbar = document.getElementById('gmToolbar');
    var gmToolbarMover = document.getElementById('gmToolbarMover');
    //beginning of cursor's position shift
    var cursorPosX = e.clientX;
    var cursorPosY = e.clientY;

    gmToolbarMover.style.cursor = "grabbing";
    document.addEventListener('mousemove', MoveGmDiv); //events are added to document
    document.addEventListener('mouseup', StopMoving);  //instead of div itself to enhance fluency


    function MoveGmDiv(e) {
        e = e || window.event;
        e.preventDefault();
        //position after shift is the div's position + the reversed shift (since XY axis are reversed)
        //there is no offsetLeft, so to make block stick to right, code below is necessary
        gmToolbar.style.right = (window.innerWidth - gmToolbar.offsetLeft - 200 + (cursorPosX - e.clientX)) + "px";
        gmToolbar.style.top = (gmToolbar.offsetTop - (cursorPosY - e.clientY)) + "px";
        //setting new cursor position
        cursorPosX = e.clientX;
        cursorPosY = e.clientY;
    }

    function StopMoving() {
        gmToolbarMover.style.cursor = "grab";
        document.removeEventListener('mousemove', MoveGmDiv);
        document.removeEventListener('mouseup', StopMoving);
        //convert style.right to %
        //gmToolbar.style.right = +(gmToolbar.style.right.replace('px', '')) / window.innerWidth * 100 + "%";
    }
}

document.getElementById('gmToolbarMover').addEventListener('mousedown', GmDivMoverMouseDown);
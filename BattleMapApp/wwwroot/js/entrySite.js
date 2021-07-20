function EnterAsPlayer() {
    document.getElementById("gameMasterCheckbox").setAttribute("class", "switch unclicked");;
    document.getElementById("playerCheckbox").setAttribute("class", "switch clicked");

    document.getElementById("enteringAsGm").value = "false";
}

function EnterAsGameMaster() {
    document.getElementById("gameMasterCheckbox").setAttribute("class", "switch clicked");;
    document.getElementById("playerCheckbox").setAttribute("class", "switch unclicked");

    document.getElementById("enteringAsGm").value = "true";
}
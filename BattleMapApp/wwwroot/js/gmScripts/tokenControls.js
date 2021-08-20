let tokensPanel = document.getElementById('mainTokenScreen');

function ShowHidePanel() {
    if (tokensPanel.hidden) {
        tokensPanel.hidden = false;
    }
    else tokensPanel.hidden = true;
}

document.getElementById('showHidePanelBtn').addEventListener('click', ShowHidePanel);
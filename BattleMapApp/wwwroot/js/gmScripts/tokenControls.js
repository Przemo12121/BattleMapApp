let tokensPanel = document.getElementById('mainTokenScreen');

function ShowHidePanel() {
    if (tokensPanel.hidden) {
        tokensPanel.hidden = false;
    }
    else tokensPanel.hidden = true;
}

function GetTokenList() {
    var myframe = document.getElementById('tokenListIframe');
    var iframeDocument = myframe.contentDocument || myframe.contentWindow.document; // get access to DOM inside the iframe
    var content = iframeDocument.textContent || iframeDocument.body.textContent; // get text of iframe

    if (content != null) {
        //handle server response here
        var json = JSON.parse(content);
        //document.getElementById('test2').textContent = "?!?!?";//json['test'];
        if (json['scope'] == 1) {
            InvokeReload();
            EnableInteractions();
        }
    }
}

document.getElementById('showHidePanelBtn').addEventListener('click', ShowHidePanel);
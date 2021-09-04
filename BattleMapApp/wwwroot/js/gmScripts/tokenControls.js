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

let chosenTemplate = null;
let templateNameDisplay = document.getElementById('chosenTemplateDisplay');
let deleteTemplateIdInput = document.getElementById('deleteTemplateIdInput');
let deleteTemplateSubmit = document.getElementById('deleteTemplateSubmit');

function ChooseTemplate(sender) {
    if (chosenTemplate != null) {
        chosenTemplate.style.background = "";
    }

    sender.style.background = "blue";
    chosenTemplate = sender;
    templateNameDisplay.value = sender.getElementsByTagName('p')[0].textContent;
}

function DeleteChosenTemplate() {
    if (chosenTemplate != null) {
        deleteTemplateIdInput.value = chosenTemplate.id;
        deleteTemplateSubmit.click();
    }
}

document.getElementById('showHidePanelBtn').addEventListener('click', ShowHidePanel);
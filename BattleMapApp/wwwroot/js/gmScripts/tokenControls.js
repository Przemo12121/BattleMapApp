let tokensPanel = document.getElementById('mainTokenScreen');

function ShowHidePanel() {
    if (tokensPanel.hidden) {
        tokensPanel.hidden = false;
    }
    else tokensPanel.hidden = true;
}

function TokensControllerResponse() {
    let myframe = document.getElementById('tokenListIframe');
    let iframeDocument = myframe.contentDocument || myframe.contentWindow.document; // get access to DOM inside the iframe
    let content = iframeDocument.textContent || iframeDocument.body.textContent; // get text of iframe

    if (content != null) {
        //handle server response here
        let json = JSON.parse(content);

        if (json['scope'] == "Tokens") {
            let tokensDisplayArea = document.getElementById('tokensDisplayArea');

            if (json['action'] == "Create") {

                let newTemplateImage = document.createElement('img');
                newTemplateImage.src = json['newTemplate']['value']['image'];

                let newTemplateName = document.createElement('p');
                newTemplateName.textContent = json['newTemplate']['value']['name'];

                let newTemplateHitbox = document.createElement("div");
                newTemplateHitbox.className = "tokenTemplateHitbox";
                newTemplateHitbox.draggable = false;
                newTemplateHitbox.id = json['newTemplate']['value']['id'];
                newTemplateHitbox.appendChild(newTemplateImage);
                newTemplateHitbox.appendChild(newTemplateName);
                newTemplateHitbox.addEventListener('click', function () {
                    ChooseTemplate(newTemplateHitbox);
                });

                let newTemplate = document.createElement("div");
                newTemplate.id = "template" + json['newTemplate']['value']['id'];
                newTemplate.className = "tokenTemplate";
                newTemplate.appendChild(newTemplateHitbox);

                tokensDisplayArea.appendChild(newTemplate);
            }
            else if (json['action'] == "Delete") {
                tokensDisplayArea.removeChild(document.getElementById("template" + json['removedTemplate']['value']['id']));
                chosenTemplate = null;
                templateNameDisplay.value = "";
            }
        }
    }
}
document.getElementById('tokenListIframe').addEventListener('load', TokensControllerResponse);

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
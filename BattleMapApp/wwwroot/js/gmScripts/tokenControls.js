import { MoveToken } from '../tokenScript/tokenScript.js';

class TokenController {
    tokensCounts = {};

    CreateNewToken(template) {
        this.tokensCounts[template.id] += 1;

        //creating token
        var token = document.createElement("div");
        token.setAttribute("class", "token");

        var tokenImage = new Image();
        tokenImage.src = template.getElementsByTagName('img')[0].src;
        tokenImage.setAttribute("class", "tokenImage");
        token.id = template.id + template.getElementsByTagName('p')[0].textContent + this.tokensCounts[template.id];
        token.appendChild(tokenImage);

        tokensArea.appendChild(token);
        MoveToken(token);
    }

    CreateNewTemplate(templateName) {
        this.tokensCounts[templateName] = 0;
    }

    RemoveToken(name) {

    }

    RemoveTemplateAndAllAssoscietedTokens(templateName) {
        delete this.tokensCounts[templateName];
    }
}

let tokensPanel = document.getElementById('mainTokenScreen');
let tokensArea = document.getElementById('tokensArea');
let tokenController = new TokenController();

function ShowHidePanel() {
    if (tokensPanel.hidden) {
        tokensPanel.hidden = false;
    }
    else tokensPanel.hidden = true;
}
document.getElementById('showHidePanelBtn').addEventListener('click', ShowHidePanel);

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
                tokenController.CreateNewTemplate(newTemplate.id);
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

function DeleteChosenTemplate() {
    let chosenTemplateInput = document.getElementById('chosenTemplateInput');
    if (chosenTemplateInput.value > null) {
        deleteTemplateIdInput.value = chosenTemplateInput.value;
        deleteTemplateSubmit.click();
        chosenTemplateInput.value = "";
    }
}
document.getElementById('removeTokenBtn').addEventListener('click', DeleteChosenTemplate);

//chosen template must be browsed from new input
function CreateToken() {
    tokenController.CreateNewToken(document.getElementById(document.getElementById('chosenTemplateInput').value));
}
document.getElementById('addTokenBtn').addEventListener('click', CreateToken);
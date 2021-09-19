import { MoveToken, CreateToken } from '../tokenScript/tokenScript.js';
import { InvokeCreateToken, InvokeRemoveToken, InvokeChangeAlignment } from '../session.js';

class TokenController {
    tokensCounts = new Map();

    CreateNewToken(template) {
        let templateId = template.id.replace("template", "");

        if (isNaN(this.tokensCounts.get(templateId))) {
            this.tokensCounts.set(templateId, 0);
        }

        this.tokensCounts.set(templateId, Number(this.tokensCounts.get(templateId)) + 1);

        document.getElementById('test').textContent = templateId;
        document.getElementById('test3').textContent = this.tokensCounts.get(templateId);

        let imagePath = template.getElementsByTagName('img')[0].src;
        let tokenId = template.id + template.getElementsByTagName('p')[0].textContent + this.tokensCounts.get(templateId);
        let alignment = document.getElementById('templateAlignmentSelect').value;

        var newToken = CreateToken(imagePath, tokenId, alignment);

        newToken.addEventListener('click', function () {
            MarkToken(tokenId, imagePath);
        });

        MoveToken(newToken);

        InvokeCreateToken(imagePath, tokenId, alignment);
    }

    RemoveToken(name) {
        document.getElementById(name).remove();
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

let templateNameDisplay = document.getElementById('chosenTemplateDisplay');
let deleteTemplateIdInput = document.getElementById('deleteTemplateIdInput');
let deleteTemplateSubmit = document.getElementById('deleteTemplateSubmit');

function DeleteChosenTemplate() {
    let chosenTemplateInput = document.getElementById('chosenTemplateInput');

    if (chosenTemplateInput.value.length > 0) {
        deleteTemplateIdInput.value = chosenTemplateInput.value;
        deleteTemplateSubmit.click();

        chosenTemplateInput.value = "";
        templateNameDisplay.value = "";
    }
}
document.getElementById('removeTemplateBtn').addEventListener('click', DeleteChosenTemplate);

function CreateTokenAction() {
    if (templateNameDisplay.value.length > 0) {
        tokenController.CreateNewToken(document.getElementById(document.getElementById('chosenTemplateInput').value));
    }
}
document.getElementById('addTokenBtn').addEventListener('click', CreateTokenAction);

function RemoveToken() {
    if (chosenToken.length > 0) {
        tokenController.RemoveToken(chosenToken);

        InvokeRemoveToken(chosenToken);

        chosenToken = "";
        document.getElementById('chosenTokenDisplay').src = "";
    }
}
document.getElementById('removeTokenBtn').addEventListener('click', RemoveToken);

let chosenToken = "";
function MarkToken(name, imagePath) {
    chosenToken = name;
    document.getElementById('chosenTokenDisplay').src = imagePath;

    let alignment = document.getElementById(name).style.backgroundColor;
    let alignemntSelect = document.getElementById('alignmentSelect');

    switch (alignment) {
        case 'black':
            alignemntSelect.value = 'Neutral';
            break;
        case 'green':
            alignemntSelect.value = 'Ally';
            break;
        case 'blue':
            alignemntSelect.value = 'Player';
            break;
        case 'red':
            alignemntSelect.value = 'Enemy';
            break;
        default:
            alignemntSelect.value = 'Neutral';
    }
}

function ChangeAlignment() {
    if (chosenToken.length > 0) {
        let token = document.getElementById(chosenToken);
        let newAlignment = document.getElementById('alignmentSelect').value;

        switch (newAlignment) {
            case 'Neutral':
                token.style.backgroundColor = 'black';
                break;
            case 'Ally':
                token.style.backgroundColor = 'green';
                break;
            case 'Player':
                token.style.backgroundColor = 'blue';
                break;
            case 'Enemy':
                token.style.backgroundColor = 'red';
                break;
            default:
                token.style.backgroundColor = 'black';
        }

        InvokeChangeAlignment(chosenToken, token.style.backgroundColor);
    }
}
document.getElementById('alignmentSelect').addEventListener('change', ChangeAlignment);

let interactionsEnabled = false;

export function EnableInteractions() {
    interactionsEnabled = true;
}

export function DisableInteractions() {
    interactionsEnabled = false;
}

export function AreInteractionsEnabled() {
    return interactionsEnabled;
}
import CardsDeck from "../components/Practice/cardsDeck";

export const loadPlay = (localStorageId, createNewDeck, setPlayEnded, setCardsDeck, shouldDeckFlipped) => {
    let lastCardsDeck = localStorage.getItem(localStorageId);
    let newDeck;
    if (!lastCardsDeck) {
        // no storage
        newDeck = createNewDeck(shouldDeckFlipped);
    } else {
        // storage is loaded
        newDeck = new CardsDeck(localStorageId, null, shouldDeckFlipped);
        try {
            newDeck.setStorage(lastCardsDeck);
            if (!newDeck.top()) {
                setPlayEnded();
            }
        } catch (e) {
            // storage were bad
            localStorage.removeItem(localStorageId);
            newDeck = createNewDeck(shouldDeckFlipped);
        }
    }
    setCardsDeck(newDeck);
    return newDeck;
};

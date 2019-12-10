import CardsDeck from "../components/Practice/cardsDeck";

export const loadPlay = (localStorageId, createNewDeck, setPlayEnded, setCardsDeck, shouldDeckFlipped) => {
    let lastCardsDeck = localStorage.getItem(localStorageId);
    let newDeck;
    if (!lastCardsDeck) {
        // no storage
        // console.warn('loadPlay - no localStorage');
        newDeck = createNewDeck(shouldDeckFlipped);
    } else {
        // storage is loaded
        // console.warn('loadPlay - storage is loaded');
        newDeck = new CardsDeck(localStorageId, null, shouldDeckFlipped);
        try {
            newDeck.setStorage(lastCardsDeck);
            if (!newDeck.top()) {
                // console.warn('loadPlay - new deck is empty');
                setPlayEnded();
            }
        } catch (e) {
            // storage were bad
            console.error('loadPlay - localStorage was bitter');
            localStorage.removeItem(localStorageId);
            newDeck = createNewDeck(shouldDeckFlipped);
        }
    }
    setCardsDeck(newDeck);
    return newDeck;
};

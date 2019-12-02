import CardsDeck from "../components/Practice/cardsDeck";

export const loadPlay = (localStorageId, createNewDeck, setPlayEnded, setCardsDeck) => {
    let lastCardsDeck = localStorage.getItem(localStorageId);
    let newDeck;
    if (!lastCardsDeck) {
        // no storage
        newDeck = createNewDeck();
    } else {
        // storage is loaded
        newDeck = new CardsDeck();
        try {
            newDeck.setStorage(lastCardsDeck);
            if (!newDeck.top()) {
                setPlayEnded();
            }
        } catch (e) {
            // storage were bad
            localStorage.removeItem(localStorageId);
            newDeck = createNewDeck();
        }
    }
    setCardsDeck(newDeck);
};

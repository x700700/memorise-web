import logger from "./logger";
import CardsDeck from "../components/Practice/cardsDeck";

export const loadPlay = (localStorageId, createNewDeck, setPlayEnded, setCardsDeck, shouldDeckFlipped) => {
    let lastCardsDeck = localStorage.getItem(localStorageId);
    let newDeck;
    if (!lastCardsDeck) {
        // no storage
        // logger.warn('loadPlay - no localStorage');
        newDeck = createNewDeck(shouldDeckFlipped);
    } else {
        // storage is loaded
        // logger.warn('loadPlay - storage is loaded');
        newDeck = new CardsDeck(localStorageId, null, shouldDeckFlipped);
        try {
            newDeck.setStorage(lastCardsDeck);
            if (newDeck.getFullDeckSize() === 0) {
                logger.error('loadPlay - new deck is empty');
                newDeck = createNewDeck(shouldDeckFlipped);
            }
            if (!newDeck.top()) {
                // logger.warn('loadPlay - new deck is at game end');
                setPlayEnded();
            }
        } catch (e) {
            // storage were bad
            logger.error('loadPlay - localStorage was bitter');
            localStorage.removeItem(localStorageId);
            newDeck = createNewDeck(shouldDeckFlipped);
        }
    }
    setCardsDeck(newDeck);
    return newDeck;
};

import logger from "./logger";
import CardsDeck from "../components/Practice/cardsDeck";
import mock from "../mock/training-multiply";


export const loadCardsDeck = (storageId, _cardsDeck, training, isDeckFlipped) => {
    let cardsDeck = _cardsDeck;
    try {
        if (training) {
            logger.trace('load game - from action');
            cardsDeck = new CardsDeck(storageId, training, isDeckFlipped);
        }
        else if (!cardsDeck) {
            logger.trace('load game - no store, loading from storage');
            const savedCardsDeck = localStorage.getItem(storageId);
            cardsDeck = new CardsDeck(storageId, null, isDeckFlipped);
            cardsDeck.setStorage(savedCardsDeck);
        }
    } catch (e) {
        logger.trace('game load - localStorage was bitter');
        localStorage.removeItem(storageId);
        cardsDeck = new CardsDeck(storageId, Object.values(mock)[0], isDeckFlipped);
    }
    if (cardsDeck.getFullDeckSize() === 0) {
        logger.trace('game load - new deck is empty, loading mock');
        localStorage.removeItem(storageId);
        cardsDeck = new CardsDeck(storageId, Object.values(mock)[0], isDeckFlipped);
    }
    // if (cardsDeck) localStorage.setItem(storageId, cardsDeck.getStorage());
    return cardsDeck;
};




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

import logger from "./logger";
import CardsDeck from "../components/Practice/cardsDeck";
import mock from "../mock/training-multiply";


export const loadCardsDeck = (storageId, _cardsDeck, training, isDeckFlipped) => {
    logger.trace('load game - isDeckFlipped = ', isDeckFlipped);
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

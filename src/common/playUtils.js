import logger from "./logger";
import CardsDeck from "../components/Practice/cardsDeck";
import mock from "../mock/training-multiply";


export const loadCardsDeck = (storageId, _cardsDeck, friendName, training, isDeckFlipped) => {
    logger.trace('load Cards Deck - isDeckFlipped = ', isDeckFlipped);
    let cardsDeck = _cardsDeck;
    try {
        if (training) {
            logger.trace('load Cards Deck - from action');
            cardsDeck = new CardsDeck(storageId, friendName, training, isDeckFlipped);
        }
        else if (!cardsDeck) {
            logger.trace('load Cards Deck - no store, loading from storage');
            const savedCardsDeck = localStorage.getItem(storageId);
            cardsDeck = new CardsDeck(storageId, null, null, isDeckFlipped);
            cardsDeck.setStorage(savedCardsDeck);
        }
    } catch (e) {
        logger.trace('load Cards Deck - localStorage was bitter');
        localStorage.removeItem(storageId);
        cardsDeck = new CardsDeck(storageId, null, Object.values(mock)[0], isDeckFlipped);
    }
    if (cardsDeck.getFullDeckSize() === 0) {
        logger.trace('load Cards Deck - new deck is empty, loading mock');
        localStorage.removeItem(storageId);
        cardsDeck = new CardsDeck(storageId, null, Object.values(mock)[0], isDeckFlipped);
    }
    // if (cardsDeck) localStorage.setItem(storageId, cardsDeck.getStorage());
    return cardsDeck;
};

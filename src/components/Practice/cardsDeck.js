import _ from 'lodash';
import consts from "../../common/consts";
// import { cardsDeckStub } from '../stubs/cardsDeck';

export default class cardsDeck {

    constructor(training) {
        if (training) {
            const exercises = training && training.exercises && _.values(training.exercises);
            // console.warn('cardsDeck - exercises = ', exercises);
            this.initialDeck = _.cloneDeep(exercises);
        } else {
            this.initialDeck = [];
        }
        this.reset(training, consts.play.defaultCardsNum);
        if (training) {
            this.validate();
        }
    }

    reset = (shouldSaveToStorage, cardsNum) => {
        this.currentDeck = _.cloneDeep(this.initialDeck.filter(x => x.q && x.a));
        this.sizeTraining = this.currentDeck.length;
        this.currentDeck = (_.shuffle(this.currentDeck)).splice(0, cardsNum);
        this.sizeDeck = this.currentDeck.length;
        this.plays = 0;
        this.wrongsDeck = [];
        if (shouldSaveToStorage) {
            localStorage.setItem(consts.localStorage.gameId, this.getStorage());
        }
    };
    validate = () => {
        if (!this.initialDeck || this.initialDeck.length === 0) {
            throw new Error('Tried to loaded empty training');
        }
    };

    getStorage = () => {
        const mem = {
            initialDeck: this.initialDeck,
            currentDeck: this.currentDeck,
            wrongsDeck: this.wrongsDeck,
            sizeTraining: this.sizeTraining,
            sizeDeck: this.sizeDeck,
            plays: this.plays,
        };
        const json = JSON.stringify(mem);
        return json;
    };
    setStorage = (storage) => {
        const mem = JSON.parse(storage);
        this.initialDeck = mem.initialDeck;
        this.currentDeck = mem.currentDeck;
        this.wrongsDeck = mem.wrongsDeck;
        this.sizeTraining = mem.sizeTraining;
        this.sizeDeck = mem.sizeDeck;
        this.plays = mem.plays;
    };

    top = () => this.currentDeck[0] || null;
    getSizeTraining = () => this.sizeTraining;
    getSizeDeck = () => this.sizeDeck;
    sizeCurr = () => this.currentDeck.length + this.wrongsDeck.length;
    playsNum = () => this.plays;

    replay = (cardsNum) => {
        this.reset(true, cardsNum);
    };
    nextCard = (right) => {
        let deckFinished = false;
        // console.warn('cards lengths ---->', this.currentDeck.length, this.wrongsDeck.length);
        if (this.currentDeck.length === 0 && this.wrongsDeck.length === 0) {
            deckFinished = true;
        } else {
            deckFinished = false;
            this.plays++;
            if (right) {
                this.currentDeck.splice(0, 1);
                if (this.currentDeck.length === 0 && this.wrongsDeck.length === 0) {
                    deckFinished = true;
                }
            } else {
                this.wrongsDeck.unshift(this.currentDeck.splice(0, 1)[0]);
            }
            if (this.currentDeck.length === 0) {
                this.currentDeck = _.cloneDeep(this.wrongsDeck);
                this.currentDeck = _.shuffle(this.currentDeck.slice(1));
                this.currentDeck.push(this.wrongsDeck[0]);
                this.wrongsDeck = [];
            }
        }
        localStorage.setItem(consts.localStorage.gameId, this.getStorage());
        return deckFinished;
    }
}

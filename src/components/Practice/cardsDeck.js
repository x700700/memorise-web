import _ from 'lodash';
import consts from "../../common/consts";
// import { cardsDeckStub } from '../stubs/cardsDeck';

export default class cardsDeck {

    constructor(localStorageKey, training, shouldDeckFlipped) {
        if (training) {
            const exercises = training && training.exercises && _.values(training.exercises);
            // console.warn('cardsDeck - exercises = ', exercises);
            this.initialDeck = _.cloneDeep(exercises);
        } else {
            this.initialDeck = [];
        }
        this.localStorageKey = localStorageKey;
        this.reset(training, consts.play.defaultCardsNum);
        this.isDeckFlipped = shouldDeckFlipped || false;
        if (training) {
            this.validate();
        }
    }

    reset = (shouldSaveToStorage, cardsNum) => {
        this.currentDeck = this.initialDeck.filter(x => x.q && x.a);
        this.sizeTraining = this.currentDeck.length;
        this.currentDeck = (_.shuffle(this.currentDeck)).splice(0, cardsNum);
        this.examStartDeck = _.cloneDeep(this.currentDeck);
        this.sizeDeck = this.currentDeck.length;
        this.plays = 0;
        this.wrongsDeck = [];
        if (shouldSaveToStorage) {
            localStorage.setItem(this.localStorageKey, this.getStorage());
        }
    };
    validate = () => {
        if (!this.initialDeck || this.initialDeck.length === 0) {
            throw new Error('Tried to loaded empty training');
        }
    };

    getStorage = () => {
        const mem = {
            localStorageKey: this.localStorageKey,
            initialDeck: this.initialDeck,
            currentDeck: this.currentDeck,
            examStartDeck: this.examStartDeck,
            wrongsDeck: this.wrongsDeck,
            sizeTraining: this.sizeTraining,
            sizeDeck: this.sizeDeck,
            isDeckFlipped: this.isDeckFlipped,
            plays: this.plays,
        };
        const json = JSON.stringify(mem);
        return json;
    };
    setStorage = (storage) => {
        const mem = JSON.parse(storage);
        this.localStorageKey = mem.localStorageKey;
        this.initialDeck = mem.initialDeck;
        this.currentDeck = mem.currentDeck;
        this.examStartDeck = mem.examStartDeck;
        this.wrongsDeck = mem.wrongsDeck;
        this.sizeTraining = mem.sizeTraining;
        this.sizeDeck = mem.sizeDeck;
        this.isDeckFlipped = mem.isDeckFlipped;
        this.plays = mem.plays;
    };

    top = () => this.currentDeck[0] || null;
    topQ = () => !this.isDeckFlipped ? (this.currentDeck[0] || {}).q : (this.currentDeck[0] || {}).a || '';
    topA = () => !this.isDeckFlipped ? (this.currentDeck[0] || {}).a : (this.currentDeck[0] || {}).q || '';
    topQAnswers = () => {
        let answers = [];
        if (this.examStartDeck && this.currentDeck && this.currentDeck.length > 0) {
            const a = !this.isDeckFlipped ? 'a' : 'q';
            const right = this.currentDeck[0];
            answers = this.examStartDeck.slice(1).slice(0, 4);
            answers.unshift(right);
            answers = _.shuffle(answers);
            answers = answers.map(x => x && x[a]);
        }
        // console.warn('------->', answers);
        return answers
    };

    getSizeTraining = () => this.sizeTraining;
    getSizeDeck = () => this.sizeDeck;
    sizeCurr = () => this.currentDeck.length + this.wrongsDeck.length;
    playsNum = () => this.plays;
    getIsDeckFlipped = () => this.isDeckFlipped;

    replay = (cardsNum) => {
        this.reset(true, cardsNum);
    };
    setIsDeckFlipped = (flipped) => {
        this.isDeckFlipped = flipped;
        localStorage.setItem(this.localStorageKey, this.getStorage());
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
        localStorage.setItem(this.localStorageKey, this.getStorage());
        return deckFinished;
    }
}

import _ from 'lodash';
// import { cardsDeckStub } from '../stubs/cardsDeck';

export default class cardsDeck {

    constructor(training) {
        const exercises = training && training.exercises && _.values(training.exercises);
        // console.warn('cardsDeck - exercises = ', exercises);
        this.initialDeck = _.cloneDeep(exercises);
        this.reset();
        this.validate();
    }

    reset = () => {
        this.currentDeck = _.cloneDeep(this.initialDeck.filter(x => x.q && x.a));
        this.currentDeck = (_.shuffle(this.currentDeck)).splice(0, 2); // Todo - cut just to keep small
        this.size = this.currentDeck.length;
        this.plays = 0;
        this.nextDeck = [];
    };
    validate = () => {
        if (!this.initialDeck || this.initialDeck.length === 0) {
            throw new Error('cards deck is empty');
        }
    };

    top = () => this.currentDeck[0] || [];
    sizeStart = () => this.size;
    sizeCurr = () => this.currentDeck.length + this.nextDeck.length;
    playsNum = () => this.plays;

    nextCard = (right) => {
        let deckFinished = false;
        // console.warn('cards lengths ---->', this.currentDeck.length, this.nextDeck.length);
        if (this.currentDeck.length === 0 && this.nextDeck.length === 0) {
            deckFinished = true;
        } else {
            deckFinished = false;
            this.plays++;
            if (right) {
                this.currentDeck.splice(0, 1);
                if (this.currentDeck.length === 0 && this.nextDeck.length === 0) {
                    deckFinished = true;
                }
            } else {
                this.nextDeck.unshift(this.currentDeck.splice(0, 1)[0]);
            }
            if (this.currentDeck.length === 0) {
                this.currentDeck = _.cloneDeep(this.nextDeck);
                this.currentDeck = _.shuffle(this.currentDeck.slice(1));
                this.currentDeck.push(this.nextDeck[0]);
                this.nextDeck = [];
            }
        }
        return deckFinished;
    }
}

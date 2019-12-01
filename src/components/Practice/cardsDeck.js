import _ from 'lodash';
// import { cardsDeckStub } from '../stubs/cardsDeck';

export default class cardsDeck {

    constructor(training) {
        const exercises = training && training.exercises && _.values(training.exercises);
        // console.warn('cardsDeck - exercises = ', exercises);
        this.initialDeck = _.cloneDeep(exercises);
        this.currentDeck = _.cloneDeep(this.initialDeck.filter(x => x.q && x.a));
        this.currentDeck = (_.shuffle(this.currentDeck)).splice(0, 8); // Todo - cut just to keep small
        this.size = this.currentDeck.length;
        this.nextDeck = [];
        this.validate();
    }

    validate = () => {
        if (!this.initialDeck || this.initialDeck.length === 0) {
            throw new Error('cards deck is empty');
        }
    };

    top = () => this.currentDeck[0] || [];
    sizeStart = () => this.size;
    sizeCurr = () => this.currentDeck.length + this.nextDeck.length;

    nextCard = (right) => {
        let deckFinished = false;
        if (this.currentDeck.length === 0 && this.nextDeck.length === 0) {
            console.warn('fin');
            deckFinished = true;
        } else {
            deckFinished = false;
            if (right) {
                this.currentDeck.splice(0, 1);
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

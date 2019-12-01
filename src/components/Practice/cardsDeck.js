import _ from 'lodash';
// import { cardsDeckStub } from '../stubs/cardsDeck';

export default class cardsDeck {

  constructor(training) {
    const exercises = training && training.exercises && _.values(training.exercises);
    // console.warn('cardsDeck - exercises = ', exercises);
    this.initialDeck = _.cloneDeep(exercises);
    this.currentDeck = _.cloneDeep(this.initialDeck.filter(x => x.q && x.a));
    this.nextDeck = [];
    this.validate();
  }

  validate = () => {
    if (!this.initialDeck || this.initialDeck.length === 0) {
      throw new Error('cards deck is empty');
    }
  };

  top = () => {
    return this.currentDeck[0] || [];
  };

  nextCard = (right) => {
    let deckFinished = false;
    if (this.currentDeck.length === 0 && this.nextDeck.length === 0) {
      console.warn('fin');
      deckFinished = true;
    } else {
      deckFinished = false;
      this.nextDeck.unshift(this.currentDeck.splice(0, 1)[0]);
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

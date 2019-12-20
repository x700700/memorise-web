import logger from "../../common/logger";
import * as _ from '../../common/boolidash';
import consts from "../../common/consts";

export default class cardsDeck {

    constructor(localStorageKey, training, shouldDeckFlipped, playSize = consts.play.defaultCardsNum) {
        logger.trace('CardsDeck ctor - shouldDeckFlipped = ', shouldDeckFlipped);
        if (training) {
            const exercises = training && training.exercises && Object.values(training.exercises);
            // logger.warn('=====> cardsDeck - exercises = ', exercises);
            this.name = training.name;
            this.trainingSize = exercises.length;
            this.initialDeck = exercises.filter(x => x.q && x.a);
        } else {
            this.initialDeck = [];
        }
        this.localStorageKey = localStorageKey;
        this.reset(training, playSize, shouldDeckFlipped);
        if (training) {
            this.validate();
        }
    }

    reset = (shouldSaveToStorage, playSize, shouldDeckFlipped) => {
        this.isDeckFlipped = shouldDeckFlipped;
        if (this.isNextDeckFlipped) this.isDeckFlipped = this.isNextDeckFlipped === 2;
        if (shouldDeckFlipped) this.isNextDeckFlipped = 2;
        logger.trace('this.isDeckFlipped = ', this.isDeckFlipped);

        this.currentDeck = this.initialDeck;
        this.examStartDeck = [...this.currentDeck];
        this.currentDeck = (_.shuffle(this.currentDeck)).splice(0, playSize);
        this.playDeckSize = this.currentDeck.length;
        this.topQAnswers = this.createTopQAnswers();
        this.isExamPageAnswered = false;
        this.topQAnswerId = null;
        this.plays = 0;
        this.rights = 0;
        this.wrongs = 0;
        this.wrongsDeck = [];
        if (shouldSaveToStorage) {
            localStorage.setItem(this.localStorageKey, this.getStorage());
        }
    };
    validate = () => {
        if (!this.initialDeck || this.initialDeck.length === 0) {
            this.initialDeck = [];
            // throw new Error('Tried to loaded empty training');
        }
    };

    getStorage = () => {
        const mem = {
            localStorageKey: this.localStorageKey,
            name: this.name,
            initialDeck: this.initialDeck,
            examStartDeck: this.examStartDeck,
            currentDeck: this.currentDeck,
            topQAnswers: this.topQAnswers,
            isExamPageAnswered: this.isExamPageAnswered,
            topQAnswerId: this.topQAnswerId,
            isNextDeckFlipped: this.isNextDeckFlipped,
            wrongsDeck: this.wrongsDeck,
            trainingSize: this.trainingSize,
            playDeckSize: this.playDeckSize,
            isDeckFlipped: this.isDeckFlipped,
            plays: this.plays,
            rights: this.rights,
            wrongs: this.wrongs,
        };
        const json = JSON.stringify(mem);
        return json;
    };
    setStorage = (storage) => {
        const mem = JSON.parse(storage);
        this.localStorageKey = mem.localStorageKey;
        this.name = mem.name;
        this.initialDeck = mem.initialDeck;
        this.examStartDeck = mem.examStartDeck;
        this.currentDeck = mem.currentDeck;
        this.topQAnswers = mem.topQAnswers;
        this.isExamPageAnswered = mem.isExamPageAnswered;
        this.topQAnswerId = mem.topQAnswerId;
        this.isNextDeckFlipped = mem.isNextDeckFlipped;
        this.wrongsDeck = mem.wrongsDeck;
        this.trainingSize = mem.trainingSize;
        this.playDeckSize = mem.playDeckSize;
        this.isDeckFlipped = mem.isDeckFlipped;
        this.plays = mem.plays;
        this.rights = mem.rights;
        this.wrongs = mem.wrongs;

        if (!this.playDeckSize || !this.initialDeck || !Array.isArray(this.initialDeck) || this.initialDeck.length === 0) {
            logger.error('local storage seems to be improper, deleting it.');
            localStorage.removeItem(this.localStorageKey);
        }
        /*
        if (this.topQAnswers && (!Array.isArray(this.topQAnswers) || this.topQAnswers.length === 0)) {
            logger.error('local storage seems to be improper, deleting it.');
            localStorage.removeItem(this.localStorageKey);
            this.topQAnswers = [];
        }
         */
    };

    getName = () => this.name;
    top = () => this.currentDeck[0] || null;
    topQ = () => !this.isDeckFlipped ? (this.currentDeck[0] || {}).q : (this.currentDeck[0] || {}).a || '';
    topA = () => !this.isDeckFlipped ? (this.currentDeck[0] || {}).a : (this.currentDeck[0] || {}).q || '';
    getTopQAnswers = () => this.topQAnswers;
    getIsExamPageAnswered = () => this.isExamPageAnswered;
    getTopQAnswerId = () => this.topQAnswerId;
    getRightsNum = () => this.rights;

    getTrainingSize = () => this.trainingSize;
    getFullDeckSize = () => this.initialDeck.length;
    getPlayDeckSize = () => this.playDeckSize;
    getDeckCurrentSize = () => this.currentDeck.length + this.wrongsDeck.length;
    getPlays = () => this.plays;
    getIsDeckFlipped = () => this.isDeckFlipped;
    getIsNextDeckFlipped = () => this.isNextDeckFlipped === 2;

    replay = (playSize) => {
        this.reset(true, playSize, this.isDeckFlipped);
    };
    setIsDeckFlipped = (flipped) => {
        this.isDeckFlipped = flipped;
        localStorage.setItem(this.localStorageKey, this.getStorage());
    };
    setIsNextDeckFlipped = (flipped) => {
        this.isNextDeckFlipped = !flipped ? 1 : 2;
        localStorage.setItem(this.localStorageKey, this.getStorage());
    };
    nextCard = (right) => {
        let deckFinished = false;
        // logger.warn('cards lengths ---->', this.currentDeck.length, this.wrongsDeck.length);
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
                const wrongCard = this.currentDeck.splice(0, 1)[0];
                if (this.currentDeck.length > 0 || this.wrongsDeck.length > 0) {
                    this.wrongsDeck.unshift(wrongCard);
                } else {
                    this.plays++;
                    deckFinished = true;
                }
            }
            if (this.currentDeck.length === 0) {
                this.currentDeck = [...this.wrongsDeck];
                this.currentDeck = _.shuffle(this.currentDeck.slice(1));
                this.currentDeck.push(this.wrongsDeck[0]);
                this.wrongsDeck = [];
            }
            this.topQAnswers = this.createTopQAnswers();
        }
        localStorage.setItem(this.localStorageKey, this.getStorage());
        return deckFinished;
    };

    setTopQAnswer = (id) => {
        // logger.warn('cardsDeck updating Answer - ', id, this.topQAnswers);
        this.topQAnswerId = id;
        const right = this.topQAnswers.find(x => x.rightAnswer);
        this.topQAnswers.forEach((x, i) => {
            if (x.id === id) {
                x.answeredRight = x.id === right.id;
                x.answeredWrong = x.id !== right.id;
            }
        });
        this.isExamPageAnswered = true;
        localStorage.setItem(this.localStorageKey, this.getStorage());
    };
    nextQuestion = () => {
        let deckFinished = false;
        this.isExamPageAnswered = false;
        if (this.currentDeck.length === 0) {
            deckFinished = true;
        } else {
            deckFinished = false;
            const right = this.topQAnswers.find(x => x.rightAnswer).id === this.topQAnswerId;
            right && this.rights++;
            !right && this.wrongs++;
            this.currentDeck.splice(0, 1);
            if (this.currentDeck.length === 0 && this.wrongsDeck.length === 0) {
                deckFinished = true;
            }
            this.topQAnswers = this.createTopQAnswers();
        }
        localStorage.setItem(this.localStorageKey, this.getStorage());
        return deckFinished;
    };

    createTopQAnswers = () => {
        let answers = [];
        if (this.examStartDeck && this.currentDeck && this.currentDeck.length > 0) {
            const a = !this.isDeckFlipped ? 'a' : 'q';
            const right = this.currentDeck[0];
            if (right) {
                answers = (this.examStartDeck || []).filter(x => right && x && x[a] && x[a] !== right[a]);
                answers = _.uniqBy(answers, x => x.a);
                answers = _.shuffle(answers).slice(0, 4);
                answers.unshift(right);
                // logger.warn('=========>', answers);
                answers = _.shuffle(answers);
                answers = answers.map(x => ({...x, examA: x[a], rightAnswer: x.id && x.id === right.id}));
            }
        }
        return answers;
    };
}

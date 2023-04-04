import { LightningElement, api } from 'lwc';

export default class Numerator extends LightningElement {
    //@api counter = 0;
    _currentCount = 0;
    priorCount = 0;
    @api
    get counter() {
        return this._currentCount;
    }
    set counter(value) {
        this.priorCount = this._currentCount;
        this._currentCount = value;
    }

    handleIncrement() {
        startCounter = ++this.counter;
    }

    handleDecrement() {
        startCounter= --this.counter;
    }

    handleMultiply(event) {
        const factor = event.detail;
        this.counter *= factor;
        startCounter = this.counter;
    }

    handleDivide(event){
        const factor = event.detail;
        this.counter /= factor;
        startCounter = this.counter;
    }

    @api
    maximizeCounter() {
        this.counter += 1000000;
    }
}
import { LightningElement, track } from 'lwc';

export default class Stopwatch extends LightningElement {
    @track time = 0;
  @track isRunning = false;
  @track isNotRunning = false;
  interval;

  get timeString() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  handleStart() {
    this.isRunning = true;
    this.isNotRunning = false;
    this.interval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  handlePause() {
    this.isRunning = false;
    this.isNotRunning = true;
    clearInterval(this.interval);
  }

  handleReset() {
    this.time = 0;
    this.isRunning = false;
    this.isNotRunning = true;
    clearInterval(this.interval);
  }
}
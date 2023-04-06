import { LightningElement, track } from 'lwc';

export default class Timer extends LightningElement {
  @track hours = 0;
  @track minutes = 0;
  @track seconds = 0;
  @track time = 0;
  @track isRunning = true;
  @track isReset = false;
  @track isNotRunning = true;
  interval;

  get timeString() {
    const hours = this.hours.toString().padStart(2, '0');
    const minutes = this.minutes.toString().padStart(2, '0');
    const seconds = this.seconds.toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  handleHoursChange(event) {
    this.hours = parseInt(event.target.value);
    if(this.hours>0)this.isRunning = false;
    else this.isRunning = true;
  }

  handleMinutesChange(event) {
    this.minutes = parseInt(event.target.value);
    if(this.minutes>0)this.isRunning = false;
    else this.isRunning = true;
  }

  handleSecondsChange(event) {
    this.seconds = parseInt(event.target.value);
    if(this.seconds>0)this.isRunning = false;
    else this.isRunning = true;
  }

  handleStart() {
    this.isRunning = true;
    this.isReset = true;
    this.isNotRunning = false;
    this.time = this.hours * 60 * 60 + this.minutes * 60 + this.seconds;
    this.interval = setInterval(() => {
      if (this.time <= 0) {
        this.handleReset();
        return;
      }
      this.time--;
      const hours = Math.floor(this.time / 3600);
      const minutes = Math.floor((this.time - hours * 3600) / 60);
      const seconds = this.time - hours * 3600 - minutes * 60;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    }, 1000);
  }

  handlePause() {
    this.isRunning = false;
    this.isReset = false;
    this.isNotRunning = true;
    clearInterval(this.interval);
  }

  handleReset() {
    this.isRunning = true;
    this.isReset = false;
    this.isNotRunning = true;
    clearInterval(this.interval);
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.time = 0;
  }
}

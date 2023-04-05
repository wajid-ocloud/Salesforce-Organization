import { LightningElement } from 'lwc';

export default class Timer extends LightningElement {

  hours = 0;
  minutes = 0;
  seconds = 0;

  handleChangeHours(event){
    this.hours = parseInt(event.target.value);
  }
  handleChangeMinutes(event){
    this.minutes = parseInt(event.target.value);
  }
  handleChangeSeconds(event){
    this.seconds = parseInt(event.target.value);
  }

  handleStart(event){
    this.seconds = this.seconds + 3600*this.hours + 60*this.minutes;
    console.log(this.seconds); //
  }

  handleReset(event){
    
  }

}
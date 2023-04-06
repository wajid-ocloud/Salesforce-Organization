import { LightningElement, track } from 'lwc';

export default class Watch extends LightningElement {

    @track isDisplayTimer = true;
    showFeatures = true;
    timeString = '00h00m00s';
    isRunning = false;
    hour1 = 0;
    hour2 = 0;
    min1 = 0;
    min2 = 0;
    sec1 = 0;
	inputDigits = [];
    handleShowTimer(event){
        this.isDisplayTimer = true;
    }
    handleShowInput(event){
        this.isDisplayTimer = false;
    }

    handleKeyDown(event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode >= 48 && keyCode <= 57) {
      console.log(`Number pressed: ${event.key}`);

    }
  }

}
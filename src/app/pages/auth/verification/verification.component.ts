import {Component} from '@angular/core';

@Component({
  templateUrl: './verification.component.html'
})
export class VerificationComponent {

  val1!: number;

  val2!: number;

  val3!: number;

  val4!: number;

  constructor() {
  }

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace')
      if (event.code.includes('Numpad') || event.code.includes('Digit')) {
        element = event.srcElement.nextElementSibling;
      }
    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }

}

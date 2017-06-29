import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'error-message',
  template: `
    <ng-container *ngFor="let msg of showingErrorMessages; let i = index">
      <small *ngIf="i > 0" class="text-danger">
          and
      </small>
      <small class="text-danger">
          {{msg.value}}
      </small>
    </ng-container>
 `
})

export class ErrorMessageComponent {
  @Input() inputControl: any;
  @Input() inputForm: any;
  @Input() errorDefs: any;
  get showingErrorMessages() {
    let errorMessages: IErrorMessage = {};
    errorMessages = Object.assign(errorMessages, ErrorMessage.ERROR_MESSAGE);
    if (this.errorDefs !== null) {
      errorMessages = Object.assign(errorMessages, this.errorDefs);
    }

    let ret: any[] = [];
    for (let key of Object.keys(errorMessages)) {
      if (this.inputControl.control.hasError(key)
        && !(this.inputControl.pristine && !this.inputForm.submitted)) {
        ret.push({
          key: key,
          value: (<any>errorMessages)[key]
        });
      }
    }

    return ret;
  }
}

interface IErrorMessage {
  [key:string]: string;
}
class ErrorMessage {
  static ERROR_MESSAGE: IErrorMessage = {
    greatOrEqualThan: 'must be great than or equal to ',
    littleOrEqualThan: 'must be less than or equal to ',
    required: ' is required',
    bigDecimal: ' must be a decimal'
  };
}

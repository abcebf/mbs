import { FormControl, Validator } from '@angular/forms';

export abstract class PatternValidator implements Validator {
  abstract get pattern() : RegExp;
  abstract get validatorName() : string;

  validate(c: FormControl) {
    if (this.pattern.test(c.value)) {
      return null;
    } else {
      let retValue: any = {};
      retValue[this.validatorName] = {
        valid: false
      };
      return retValue;
    }
  }
}

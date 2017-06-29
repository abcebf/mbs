import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator } from '@angular/forms';

@Directive({
  selector: '[littleOrEqualThan][formControlName],[littleOrEqualThan][formControl],[littleOrEqualThan][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => LittleOrEqualThanValidatorDirective), multi: true }
  ]
})
export class LittleOrEqualThanValidatorDirective implements Validator {
  constructor(@Attribute('littleOrEqualThan') public littleOrEqualThan: string) {
  }

  validate(c: FormControl) {
    // self value
    let v = +c.value;

    // control vlaue
    let e = c.root.get(this.littleOrEqualThan);
    if (e === null) {
      return null;
    }

    if (e.errors !== null) {
      delete e.errors['greatOrEqualThan'];
      if (!Object.keys(e.errors).length) e.setErrors(null, null);
    }

    // value not valid
    if (e && v > (+e.value || e.value)) {
      return {
        littleOrEqualThan: {valid: false}
      };
    }

    return null;
  }
}

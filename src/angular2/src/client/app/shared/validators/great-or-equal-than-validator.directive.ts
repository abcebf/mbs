import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator } from '@angular/forms';

@Directive({
  selector: '[greatOrEqualThan][formControlName],[greatOrEqualThan][formControl],[greatOrEqualThan][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GreatOrEqualThanValidatorDirective), multi: true }
  ]
})
export class GreatOrEqualThanValidatorDirective implements Validator {
  constructor(@Attribute('greatOrEqualThan') public greatOrEqualThan: string) {
  }

  validate(c: FormControl) {
    // self value
    let v = +c.value || c.value;

    //console.error(this.greatOrEqualThan);
    // control vlaue
    let e = c.root.get(this.greatOrEqualThan);
    if (e === null) {
      return null;
    }

    //console.error(`@@@@@@@@${v}, ${+e.value || e.value}`);

    if (e.errors !== null) {
      delete e.errors['littleOrEqualThan'];
      if (!Object.keys(e.errors).length) e.setErrors(null, null);
    }

    // value not equal
    if (e && v < (+e.value || e.value)) {
      return {
        greatOrEqualThan: {valid: false}
      };
    }

    return null;
  }
}

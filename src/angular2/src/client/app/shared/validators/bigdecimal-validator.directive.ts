import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { PatternValidator } from './pattern-validator';

@Directive({
  selector: '[bigDecimal][formControlName],[bigDecimal][formControl],[bigDecimal][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BigDecimalValidatorDirective), multi: true }
  ]
})
export class BigDecimalValidatorDirective extends PatternValidator {
  get pattern() : RegExp {
    return /^[\d]+(\.[\d]+)?$/i;
  }
  get validatorName() : string {
    return 'bigDecimal';
  }
}

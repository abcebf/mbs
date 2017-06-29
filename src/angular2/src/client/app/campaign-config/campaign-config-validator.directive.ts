import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl,Validator } from '@angular/forms';

@Directive({
  selector: '[validCampaignConfig][formControlName],[validCampaignConfig][formControl],[validCampaignConfig][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CampaignConfigValidatorDirective), multi: true }
  ]
})
export class CampaignConfigValidatorDirective implements Validator {
  validate(c: FormControl): { [key: string]: any; } {
    var maxBonusAmountPerTrans = c.root.get('maxBonusAmountPerTrans');
    var maxBonusAmountPerMember = c.root.get('maxBonusAmountPerMember');
    var bonusCreditedAmount = c.root.get('bonusCreditedAmount');
    var bonusCreditedMethod = c.root.get('bonusCreditedMethod');

    if (maxBonusAmountPerTrans === null || maxBonusAmountPerMember === null
      || bonusCreditedAmount === null || bonusCreditedMethod === null) {
      return null;
    }

    if (bonusCreditedMethod.value === 'dollar') {
      if (+bonusCreditedAmount.value > +maxBonusAmountPerTrans.value
        || +bonusCreditedAmount.value > +maxBonusAmountPerMember.value) {
        if (c === bonusCreditedAmount) {
          return {validCampaignConfig: {valid: false}};
        } else {
          bonusCreditedAmount.setErrors({validCampaignConfig: {valid: false}});
        }
      } else {
        if (bonusCreditedAmount.errors !== null) {
          delete bonusCreditedAmount.errors['validCampaignConfig'];
          if (!Object.keys(bonusCreditedAmount.errors).length) bonusCreditedAmount.setErrors(null);
        }
      }
    } else {
      if (bonusCreditedAmount.errors !== null) {
        delete bonusCreditedAmount.errors['validCampaignConfig'];
        if (!Object.keys(bonusCreditedAmount.errors).length) bonusCreditedAmount.setErrors(null);
      }
    }

    // even though there was an error, we still return null
    // since the new error state was set on the individual field
    return null;
  }
}

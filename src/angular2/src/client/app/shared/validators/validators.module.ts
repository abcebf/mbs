import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDecimalValidatorDirective } from './bigdecimal-validator.directive';
import { EmailValidatorDirective } from './email-validator.directive';
import { GreatOrEqualThanValidatorDirective } from './great-or-equal-than-validator.directive';
import { LittleOrEqualThanValidatorDirective } from './little-or-equal-than-validator.directive';
import { ErrorMessageComponent } from './error-message.component';
import { KeyValueFilterPipe } from './key-value-filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BigDecimalValidatorDirective,
    EmailValidatorDirective,
    GreatOrEqualThanValidatorDirective,
    LittleOrEqualThanValidatorDirective,
    ErrorMessageComponent,
    KeyValueFilterPipe],
  exports: [
    BigDecimalValidatorDirective,
    EmailValidatorDirective,
    GreatOrEqualThanValidatorDirective,
    LittleOrEqualThanValidatorDirective,
    ErrorMessageComponent,
    KeyValueFilterPipe],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ValidatorsModule { }

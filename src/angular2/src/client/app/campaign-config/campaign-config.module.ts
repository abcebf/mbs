import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignConfigComponent } from './index';
import { CampaignConfigService } from '../shared/index';
import { ValidatorsModule } from '../shared/validators/validators.module';
import { CampaignConfigValidatorDirective } from './campaign-config-validator.directive';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, ValidatorsModule],
  declarations: [CampaignConfigComponent, CampaignConfigValidatorDirective],
  exports: [CampaignConfigComponent, CampaignConfigValidatorDirective],
  providers: [CampaignConfigService]
})
export class CampaignConfigModule { }

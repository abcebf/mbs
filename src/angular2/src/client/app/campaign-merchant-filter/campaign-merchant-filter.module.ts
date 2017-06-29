import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignMerchantFilterComponent } from './index';
import { CampaignFilterService } from '../shared/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CampaignMerchantFilterComponent],
  exports: [CampaignMerchantFilterComponent],
  providers: [CampaignFilterService]
})
export class CampaignMerchantFilterModule { }

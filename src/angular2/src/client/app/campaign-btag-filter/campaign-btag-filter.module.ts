import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignBtagFilterComponent } from './index';
import { CampaignFilterService } from '../shared/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CampaignBtagFilterComponent],
  exports: [CampaignBtagFilterComponent],
  providers: [CampaignFilterService]
})
export class CampaignBtagFilterModule { }

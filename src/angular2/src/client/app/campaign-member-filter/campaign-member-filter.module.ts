import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignMemberFilterComponent } from './index';
import { CampaignFilterService } from '../shared/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CampaignMemberFilterComponent],
  exports: [CampaignMemberFilterComponent],
  providers: [CampaignFilterService]
})
export class CampaignMemberFilterModule { }

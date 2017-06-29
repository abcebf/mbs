import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignService } from '../shared/campaign/index';
import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ValidatorsModule } from '../shared/validators/validators.module';

@NgModule({
  imports: [CommonModule, SharedModule, ModalModule, DatepickerModule, ValidatorsModule],
  declarations: [CampaignDetailComponent],
  exports: [CampaignDetailComponent],
  providers: [CampaignService ]
})
export class CampaignDetailModule { }

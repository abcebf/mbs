import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignReviewComponent } from './index';
import { CampaignService } from '../shared/index';
import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ParamListComponent } from './param-list.component';
import { CampaignDetailPartComponent } from './parts/detail/campaign-detail-part.component';


@NgModule({
  imports: [CommonModule, SharedModule, ModalModule, DatepickerModule],
  declarations: [CampaignReviewComponent, ParamListComponent, CampaignDetailPartComponent],
  exports: [CampaignReviewComponent],
  providers: [CampaignService]
})
export class CampaignReviewModule { }

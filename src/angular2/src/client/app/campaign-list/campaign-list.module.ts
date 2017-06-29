import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CampaignListComponent } from './campaign-list.component';
import { CampaignSublistComponent } from './campaign-sublist.component';
import { CampaignService } from '../shared/campaign/index';
import { DataTableDirectives } from 'angular2-datatable/datatable';
import { BudgetFilterPipe } from './budget-filter.pipe';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [CommonModule, SharedModule, ModalModule],
  declarations: [DataTableDirectives, CampaignSublistComponent,CampaignListComponent, BudgetFilterPipe],
  exports: [CampaignListComponent, BudgetFilterPipe],
  providers: [CampaignService]
})
export class CampaignListModule { }

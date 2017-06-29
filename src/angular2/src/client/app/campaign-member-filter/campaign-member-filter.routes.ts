import { Route } from '@angular/router';
import { CampaignMemberFilterComponent } from './index';

export const CampaignMemberFilterRoutes: Route[] = [
  {
    path: 'target-audience/:id',
    component: CampaignMemberFilterComponent
  }
];

import { Route } from '@angular/router';
import { CampaignDetailComponent } from './index';

export const CampaignDetailRoutes: Route[] = [
  {
    path: 'detail/:id',
    component: CampaignDetailComponent
  },
  {
    path: 'detail',
    component: CampaignDetailComponent
  }
];

import { Route } from '@angular/router';
import { CampaignConfigComponent } from './index';

export const CampaignConfigRoutes: Route[] = [
  {
    path: 'campaign-config/:id',
    component: CampaignConfigComponent
  }
];

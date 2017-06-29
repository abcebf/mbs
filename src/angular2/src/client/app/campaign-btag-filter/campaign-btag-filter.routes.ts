import { Route } from '@angular/router';
import { CampaignBtagFilterComponent } from './index';

export const CampaignBtagFilterRoutes: Route[] = [
  {
    path: 'btag-filter/:id',
    component: CampaignBtagFilterComponent
  }
];

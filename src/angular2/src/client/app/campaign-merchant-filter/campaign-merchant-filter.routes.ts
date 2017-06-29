import { Route } from '@angular/router';
import { CampaignMerchantFilterComponent } from './index';

export const CampaignMerchantFilterRoutes: Route[] = [
  {
    path: 'merchant-filter/:id',
    component: CampaignMerchantFilterComponent
  }
];

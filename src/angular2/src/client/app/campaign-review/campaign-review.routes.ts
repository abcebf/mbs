import { Route } from '@angular/router';
import { CampaignReviewComponent } from './index';

export const CampaignReviewRoutes: Route[] = [
  {
    path: 'bonus-review/:id',
    component: CampaignReviewComponent
  }
];

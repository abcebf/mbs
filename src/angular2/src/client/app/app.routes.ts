import { Routes } from '@angular/router';

import { CampaignListRoutes } from './campaign-list/index';
import { CampaignDetailRoutes } from './campaign-detail/index';
import { CampaignConfigRoutes } from './campaign-config/index';
import { CampaignMemberFilterRoutes } from './campaign-member-filter/index';
import { CampaignMerchantFilterRoutes } from './campaign-merchant-filter/index';
import { CampaignBtagFilterRoutes } from './campaign-btag-filter/index';
import { CampaignReviewRoutes } from './campaign-review/index';

export const routes: Routes = [
  ...CampaignListRoutes,
  ...CampaignDetailRoutes,
  ...CampaignConfigRoutes,
  ...CampaignMemberFilterRoutes,
  ...CampaignMerchantFilterRoutes,
  ...CampaignBtagFilterRoutes,
  ...CampaignReviewRoutes
];

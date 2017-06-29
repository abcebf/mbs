import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { CampaignListModule } from './campaign-list/campaign-list.module';
import { CampaignDetailModule } from './campaign-detail/campaign-detail.module';
import { CampaignConfigModule } from './campaign-config/campaign-config.module';
import { CampaignMemberFilterModule } from './campaign-member-filter/campaign-member-filter.module';
import { CampaignMerchantFilterModule } from './campaign-merchant-filter/campaign-merchant-filter.module';
import { CampaignBtagFilterModule } from './campaign-btag-filter/campaign-btag-filter.module';
import { CampaignReviewModule } from './campaign-review/campaign-review.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CampaignListModule,
    CampaignDetailModule,
    CampaignConfigModule,
    CampaignMemberFilterModule,
    CampaignMerchantFilterModule,
    CampaignBtagFilterModule,
    CampaignReviewModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}


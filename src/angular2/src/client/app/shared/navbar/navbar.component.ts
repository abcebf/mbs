import { Component } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {
  static showList = true;
  static bonusCampaignId:number;
  static showMerchantFilter = true;

  get localShowList() : boolean {
    return NavbarComponent.showList;
  }

  get localBonusCampaignId() : number {
    return NavbarComponent.bonusCampaignId;
  }

  get localshowMerchantFilter() : boolean {
    return NavbarComponent.showMerchantFilter;
  }
}

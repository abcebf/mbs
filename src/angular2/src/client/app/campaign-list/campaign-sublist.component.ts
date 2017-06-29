import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { NavbarComponent, Campaign, CampaignService, CampaignFilterService, CampaignConfigService } from '../shared/index';
import { CampaignFilterResponse } from '../shared/campaign-filter/campaign-filter';
import { CampaignFilterRequest } from '../shared/campaign-filter/campaign-filter';

@Component({
  moduleId: module.id,
  selector: 'sub-campaigns',
  templateUrl: 'campaign-sublist.component.html',
  styleUrls: ['campaign-sublist.component.css']
})

export class CampaignSublistComponent {
  @Input()
  campaigns:Array<Campaign>;
  error:any;
  // originalCampaigns:Map<string, Array<Campaign>>;
  selectedCampaign:Campaign;
  filter:string;

  @Input()
  allowApprove:Boolean;

  @ViewChild('confirmationModal')
  confirmationModal:ModalDirective;

  get debug() {
    return JSON.stringify(this.campaigns);
  }

  constructor(private router:Router, private campaignService:CampaignService,
              private campaignFilterService:CampaignFilterService,
              private campaignConfigService:CampaignConfigService) {
  }

  // onChange() {
  //   if (this.filter === null || this.filter.trim() === '') {
  //     this.campaigns = this.originalCampaigns;
  //   } else {
  //     this.campaigns = this.originalCampaigns.filter(function (item, index, obj) {
  //       return item.name.indexOf(this.filter) >= 0;
  //     });
  //   }
  // }

  onSelect(campaign:Campaign) {
    this.selectedCampaign = campaign;
    let link = ['/detail', campaign.id];
    this.router.navigate(link);
    NavbarComponent.showList = false;
    NavbarComponent.bonusCampaignId = campaign.id;
  }

  onSelectView(campaign:Campaign) {
    let link = ['/bonus-review', campaign.id];
    this.router.navigate(link);
    NavbarComponent.showList = false;
    NavbarComponent.bonusCampaignId = campaign.id;
  }

  onSelectCopy(campaign:Campaign) {
    let copiedCampaign:Campaign = new Campaign();
    copiedCampaign.copy(campaign);
    copiedCampaign.id = null;
    copiedCampaign.name = campaign.name + '_copy';
    let exclusiveInd:string = null;

    // save the new copied campaign to get the new campaign id
    this.campaignService.save(copiedCampaign)
      .subscribe(response => {
          // get original campaign's config
          this.campaignConfigService.getCampaignConfig(campaign.id)
            .subscribe(configResponse => {
                // save config to copied campaign
              this.campaignConfigService.save(configResponse, response.id)
                .subscribe();
              });

          // get original campaign's member filter
          this.campaignFilterService.getFilters(campaign.id, 'member')
            .subscribe(memberFilterResponse => {
                if (memberFilterResponse.exclusiveInd) {
                  exclusiveInd = 'EXCLUDE';
                } else {
                  exclusiveInd = 'INCLUDE';
                }
                let filterRequest:CampaignFilterRequest = this.buildFilterRequest(memberFilterResponse);
                // save member filter to copied campaign
                this.campaignFilterService.save(filterRequest, response.id, 'member', exclusiveInd)
                .subscribe();
              });

          // get original campaign's merchant filter
          this.campaignFilterService.getFilters(campaign.id, 'merchant')
            .subscribe(merchantFilterResponse => {
                if (merchantFilterResponse.exclusiveInd) {
                  exclusiveInd = 'EXCLUDE';
                } else {
                  exclusiveInd = 'INCLUDE';
                }
                let filterRequest:CampaignFilterRequest = this.buildFilterRequest(merchantFilterResponse);
                // save merchant filter to copied campaign
                this.campaignFilterService.save(filterRequest, response.id, 'merchant', exclusiveInd)
                .subscribe();
              });

          // get original campaign's btag filter
          this.campaignFilterService.getFilters(campaign.id, 'btag')
            .subscribe(btagFilterResponse => {
                if (btagFilterResponse.exclusiveInd) {
                  exclusiveInd = 'EXCLUDE';
                } else {
                  exclusiveInd = 'INCLUDE';
                }
                let filterRequest = this.buildFilterRequest(btagFilterResponse);
                // save btag filter to copied campaign
                this.campaignFilterService.save(filterRequest, response.id, 'btag', exclusiveInd)
                .subscribe();
              });

          this.onSelect(response);
        });
  }

  onSelectEnd() {
    this.campaignService.stopCampaign(this.selectedCampaign.id)
      .subscribe(response => {
        this.selectedCampaign = response;
      },
      error => this.error = <any>error);
    this.confirmationModal.hide();
    let link = ['/'];
    this.router.navigate(link);
  }

  showConfirmationModal(campaign:Campaign):void {
    this.selectedCampaign = campaign;

    this.confirmationModal.config.backdrop = false;
    this.confirmationModal.show();
  }

  hideConfirmationModal():void {
    this.confirmationModal.hide();
  }

  private buildFilterRequest(response:CampaignFilterResponse):CampaignFilterRequest {
    let request:CampaignFilterRequest = new CampaignFilterRequest();
    request.exclusiveInd = response.exclusiveInd;
    let idArray:Array<string> = response.filter.split(',');
    request.filters = idArray;

    return request;
  }

}



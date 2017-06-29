import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { NavbarComponent, Campaign, CampaignService, CampaignFilterService, CampaignConfigService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'my-campaigns',
  templateUrl: 'campaign-list.component.html',
  styleUrls: ['campaign-list.component.css']
})

export class CampaignListComponent implements OnInit {
  campaigns:{[key:string]:Array<Campaign>;};
  liveCampaigns:Array<Campaign>;
  deadCampaigns:Array<Campaign>;
  processingCampaigns:Array<Campaign>;
  // originalCampaigns:Map<string, Array<Campaign>>;
  selectedCampaign:Campaign;
  error:any;
  allowApprove:Boolean;

  @ViewChild('confirmationModal')
  confirmationModal:ModalDirective;

  get debug() {
    return JSON.stringify(this.campaigns);
  }

  constructor(private router:Router, private campaignService:CampaignService,
              private campaignFilterService:CampaignFilterService,
              private campaignConfigService:CampaignConfigService) {
    NavbarComponent.showList = true;
    NavbarComponent.bonusCampaignId = null;
  }

  ngOnInit() {
    this.getCampaigns();

    this.campaignService.allowApprove()
      .subscribe(
        response => this.allowApprove = response,
        error => this.error = <any>error
      );
  }

  getCampaigns() {
    this.campaignService.getCampaigns()
      .subscribe(
        campaigns => {
          this.campaigns = campaigns;
          //this.originalCampaigns = this.campaigns;
          this.liveCampaigns = this.fetchCampaigns(['approved', 'live']);
          this.deadCampaigns = this.fetchCampaigns(['expired','removed']);
          this.processingCampaigns = this.fetchCampaigns(['pending', 'drafting']);

          //this.campaigns.forEach(campaign => console.error(campaign.budgetExecuted))
        },
        error =>  this.error = <any>error
      );
  }

  addCampaign() {
    this.selectedCampaign = null;
    let link = ['/detail'];
    this.router.navigate(link);
    NavbarComponent.showList = false;
    NavbarComponent.bonusCampaignId = null;
  }

  private fetchCampaigns(statuses:string[]) {
    let campaigns: Array<Campaign> = [];
    statuses.forEach((status) => {
      if (this.campaigns[status]) {
        campaigns = campaigns.concat(this.campaigns[status]);
      }
    });
    return campaigns;
  }
}

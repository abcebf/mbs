import { ViewChild, Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {
  Campaign,
  CampaignConfig,
  CampaignFilterResponse,
  CampaignService,
  CampaignConfigService,
  CampaignFilterService
} from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'bonus-review',
  templateUrl: 'campaign-review.component.html',
  styleUrls: ['campaign-review.component.css']
})

export class CampaignReviewComponent implements OnInit, OnDestroy {
  title:string = 'REVIEW';
  sub:any;
  error:any;
  memberList:Array<string>;
  merchantList:Array<string>;
  btagList:Array<string>;

  @Input()
  reviewComment:string;

  @Output()
  close = new EventEmitter();

  @ViewChild('childModalPending')
  childModalPending:ModalDirective;

  @ViewChild('childModalApproved')
  childModalApproved:ModalDirective;

  private allowApprove:Boolean;
  private campaignId:number;
  private campaign:Campaign;
  private campaignConfig:CampaignConfig;
  private campaignMemberFilter:CampaignFilterResponse;
  private campaignMerchantFilter:CampaignFilterResponse;
  private campaignBtagFilter:CampaignFilterResponse;

  constructor(private route:ActivatedRoute,
              private campaignService:CampaignService,
              private campaignConfigService:CampaignConfigService,
              private campaignFilterService:CampaignFilterService) {

    this.campaign = new Campaign();
    this.campaignConfig = new CampaignConfig();
    this.campaignMemberFilter = new CampaignFilterResponse();
    this.campaignMerchantFilter = new CampaignFilterResponse();
    this.campaignBtagFilter = new CampaignFilterResponse();
    this.memberList = [];
    this.merchantList = [];
    this.btagList = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];

      this.campaignId = id;

      this.campaignService.allowApprove()
        .subscribe(
          response => this.allowApprove = response,
          error => this.error = <any>error
        );

      this.campaignService.getCampaign(id)
        .subscribe(
          response => this.campaign = response,
          error => this.error = <any>error
        );

      this.campaignConfigService.getCampaignConfig(id)
        .subscribe(
          response => {
            this.campaignConfig = response;
          },
          error => this.error = <any>error
        );

      this.campaignFilterService.getFilters(id, 'member')
        .subscribe(
          response => {
            this.campaignMemberFilter = response;
            if (response.filter !== null) {
              this.memberList = response.filter.split(',');
            }
          },
          error => this.error = <any>error
        );

      this.campaignFilterService.getFilters(id, 'merchant')
        .subscribe(
          response => {
            this.campaignMerchantFilter = response;
            if (response.filter !== null) {
              this.merchantList = response.filter.split(',');
            }
          },
          error => this.error = <any>error
        );

      this.campaignFilterService.getFilters(id, 'btag')
        .subscribe(
          response => {
            this.campaignBtagFilter = response;
            if (response.filter !== null) {
              this.btagList = response.filter.split(',');
            }
          },
          error => this.error = <any>error);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedCampaignReview:Array<string> = null) {
    this.close.emit(savedCampaignReview);
    window.history.back();
  }

  getParamValueOf(paramType:string, paramName:string): any {
    var paramValue:string;
    this.campaignConfigService.getCampaignParameter(paramType, paramName)
      .subscribe(
        response => {
          paramValue = response.paramValue;
          console.error(`${paramType}.${paramName} = ${paramValue}`);
        },
        error => this.error = <any>error);
//    console.error(`${paramType}.${paramName} = ${paramValue}`);
    return paramValue;
  }

  sendForReview(reviewAction:string) {
    this.campaignService.sendForReview(reviewAction, this.campaignId, this.reviewComment)
      .subscribe(response => {
          this.campaign = response;
        },
        error => this.error = <any>error
      );

    this.hideChildModal(reviewAction);
  }

  showChildModal(action:string):void {
    if (action === 'pending') {
      this.childModalPending.config.backdrop = false;
      this.childModalPending.show();
    } else {
      this.childModalApproved.config.backdrop = false;
      this.childModalApproved.show();
    }

  }

  hideChildModal(action:string):void {
    if (action === 'pending') {
      this.childModalPending.hide();
    } else {
      this.childModalApproved.hide();
    }
  }
}

import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Campaign, TxnType, CampaignService, NavbarComponent } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'my-campaign-detail',
  templateUrl: 'campaign-detail.component.html',
  styleUrls: ['campaign-detail.component.css']
})

export class CampaignDetailComponent implements OnInit, OnDestroy {
  typeCodes:Array<TxnType>; // store name, not code

  @Input()
  campaign:Campaign;

  @Output()
  close = new EventEmitter();

  error:any;
  sub:any;

  title:string = null;

  @ViewChild('datePickerModal')
  datePickerModal:ModalDirective;
  private campaignId:number;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private campaignService:CampaignService) {
    this.typeCodes = [];
  }

  //this.initialData = Object.assign({}, dataFromDB);
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.campaign = new Campaign();
        this.title = 'Add a Campaign';
      } else {
        let id = +params['id'];
        this.campaignId = id;
        this.campaignService.getCampaign(id)
          .subscribe(
            campaign => {
              this.campaign = campaign;
              if (campaign.typeCode === 'C2M') {
                NavbarComponent.showMerchantFilter = true;
              } else {
                NavbarComponent.showMerchantFilter = false;
              }
            },
            error => this.error = <any>error
          );
        this.title = 'Edit a Campaign';
      }

      this.campaignService.getCampaignTxnTypes()
        .subscribe(
          typeCodes => {
            this.typeCodes = typeCodes;
            if (params['id'] === undefined) {
              this.campaign.typeCode = typeCodes[0].code;
            }
          },
          error => this.error = <any>error
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // not used in detail page
  goBack(savedCampaign:Campaign = null) {
    this.close.emit(savedCampaign);
    window.history.back();
  }

  goNext() {
    let link = ['/campaign-config', this.campaignId];
    this.router.navigate(link);
  }

  /**
   * used by both add and edit campaign.
   */
  save(dirtyForm:boolean) {
    if (dirtyForm) {
      this.campaignService.save(this.campaign)
        .subscribe(response => {
            this.campaign = response;
            this.campaignId = response.id;
            this.goNext();
          },
          error => this.error = <any>error
        );
    } else {
      this.goNext();
    }
  }

  showDatePickerModal():void {
    this.datePickerModal.config.backdrop = false;
    this.datePickerModal.show();
  }

  hideChildModal():void {
    this.datePickerModal.hide();
  }

  onTypeCodeChange(campaign: Campaign) {
    if (campaign.typeCode === 'C2M') {
      NavbarComponent.showMerchantFilter = true;
    } else {
      NavbarComponent.showMerchantFilter = false;
    }
  }
}



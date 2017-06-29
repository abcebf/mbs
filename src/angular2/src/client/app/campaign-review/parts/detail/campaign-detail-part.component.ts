import { Component, OnInit, Input } from '@angular/core';

import { Campaign, TxnType, CampaignService } from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'campaign-detail-part',
  templateUrl: 'campaign-detail-part.component.html',
  styleUrls: ['campaign-detail-part.component.css']
})

export class CampaignDetailPartComponent implements OnInit {
  @Input() campaignId: number;
  typeCodes:Array<TxnType>; // store name, not code

  campaign:Campaign;

  error:any;

  constructor(private campaignService:CampaignService) {
    this.typeCodes = [];
  }

  //this.initialData = Object.assign({}, dataFromDB);
  ngOnInit() {
    this.campaignService.getCampaignTxnTypes()
      .subscribe(
        typeCodes => {
          this.typeCodes = typeCodes;
        },
        error => this.error = <any>error
      );

    this.campaignService.getCampaign(this.campaignId)
      .subscribe(
        campaign => {
          this.campaign = campaign;
        },
        error => this.error = <any>error
      );
  }
}



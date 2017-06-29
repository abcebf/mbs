import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CampaignFilterResponse,
  CampaignFilterRequest,
  FilterItem,
  CampaignFilterService
} from '../shared/index';

const FILTER_TYPE:string = 'merchant';
const INCLUDE_ALL:string = 'INCLUDE_ALL';
const EXCLUDE:string = 'EXCLUDE_LIST';
const INCLUDE:string = 'INCLUDE_LIST';

@Component({
  moduleId: module.id,
  selector: 'merchant-filter',
  templateUrl: 'campaign-merchant-filter.component.html',
  styleUrls: ['campaign-merchant-filter.component.css']
})

export class CampaignMerchantFilterComponent implements OnInit, OnDestroy {
  title:string = 'Merchants';
  @Input()
  exclusiveInd:string;

  merchants:Array<FilterItem>;

  campaignFilterResponse:CampaignFilterResponse;
  campaignFilterRequest:CampaignFilterRequest;
  campaignFilterRequestFromDB:CampaignFilterRequest;

  @Output()
  close = new EventEmitter();

  sub:any;
  error:any;
  errorMsg:string;

  private campaignId:number;
  private selectAll:boolean;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private campaignFilterService:CampaignFilterService) {
    this.campaignFilterResponse = new CampaignFilterResponse();
    this.campaignFilterRequest = new CampaignFilterRequest();
    this.campaignFilterRequestFromDB = new CampaignFilterRequest();
    this.campaignFilterRequest.filters = [];
    this.campaignFilterRequestFromDB.filters = [];
    this.merchants = [];
    this.exclusiveInd = INCLUDE_ALL;
    this.selectAll = false;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];

      this.campaignId = id;
      this.campaignFilterService.getFilters(this.campaignId, FILTER_TYPE)
        .subscribe(
          response => {
            this.campaignFilterResponse = response;
            this.campaignFilterRequestFromDB.exclusiveInd = response.exclusiveInd;
            if (response.exclusiveInd) {
              this.exclusiveInd = EXCLUDE;
            } else {
              this.exclusiveInd = INCLUDE;
            }
            // extract response filter string to members array
            let filterString = response.filter;
            let merchantIdArray:Array<string> = filterString.split(',');
            this.campaignFilterRequest.filters = merchantIdArray;
            for (var i:number = 0; i < merchantIdArray.length; i++) {
              this.merchants[i] = new FilterItem();
              this.merchants[i].id = merchantIdArray[i];

              this.campaignFilterRequestFromDB.filters[i] = merchantIdArray[i];
            }
          },
          error => this.error = <any>error
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedMerchants:Array<string> = null) {
    this.close.emit(savedMerchants);
    window.history.back();
  }

  goNext() {
    let link = ['/btag-filter', this.campaignId];
    this.router.navigate(link);
  }

  save() {
    if (this.exclusiveInd === EXCLUDE) {
      this.campaignFilterRequest.exclusiveInd = true;
    } else {
      this.campaignFilterRequest.exclusiveInd = false;
    }

    if (this.campaignFilterRequestFromDB.equals(this.campaignFilterRequest)) {
      this.goNext();
    } else {
      if (!(this.exclusiveInd === INCLUDE_ALL) && (this.campaignFilterRequest.filters.length === 0)) {
        this.errorMsg = 'You must enter a merchant list with this option!';
      } else {
        this.campaignFilterService
          .save(this.campaignFilterRequest, this.campaignId, FILTER_TYPE, this.exclusiveInd)
          .subscribe(campaignFilterResponse => {
              this.campaignFilterResponse = campaignFilterResponse;
              this.goNext();
            },
            error => this.error = <any>error
          );
      }
    }
  }

  /**
   * read the file contents into property merchants.
   * @param $event
   */
  changeListener($event:any):void {
    let self = this;
    let inputValue:any = $event.target;
    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onload = function (e) {
      let vars:Array<string> = myReader.result.split('\n');

      vars.forEach(itm => {
        if (itm.endsWith('\r')) {
          itm = itm.substring(0, itm.length - 1);
        }

        self.campaignFilterRequest.filters.push(itm);
        let aMerchant = new FilterItem();
        aMerchant.id = itm;
        self.merchants.push(aMerchant);
      });
    };

    myReader.readAsText(file);
  }

  /**
   * remove selected member from property members.
   */
  removeMerchants():void {
    this.merchants = this.merchants.filter(
      (mbr) => mbr.selected !== true
    );

    // create campaignFilterRequest
    this.campaignFilterRequest.filters = [];
    this.merchants.forEach(merchant => {
      this.campaignFilterRequest.filters.push(merchant.id);
    });
  }

  toggleAll() {
    this.merchants.forEach(merchant => {
      merchant.selected = this.selectAll;
    });
  }
}

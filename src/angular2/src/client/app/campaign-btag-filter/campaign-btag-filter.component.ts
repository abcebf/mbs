import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CampaignFilterResponse,
  CampaignFilterRequest,
  FilterItem,
  CampaignFilterService
} from '../shared/index';

const FILTER_TYPE:string = 'btag';
const INCLUDE_ALL:string = 'INCLUDE_ALL';
const EXCLUDE:string = 'EXCLUDE_LIST';
const INCLUDE:string = 'INCLUDE_LIST';

@Component({
  moduleId: module.id,
  selector: 'btag-filter',
  templateUrl: 'campaign-btag-filter.component.html',
  styleUrls: ['campaign-btag-filter.component.css']
})

export class CampaignBtagFilterComponent implements OnInit, OnDestroy {
  title:string = 'BTAGS';
  @Input()
  exclusiveInd:string;

  @Input()
  newBtag:string;

  btags:Array<FilterItem>;

  campaignFilterResponse:CampaignFilterResponse;
  campaignFilterRequest:CampaignFilterRequest;
  campaignFilterRequestFromDB:CampaignFilterRequest;

  @Output()
  close = new EventEmitter();

  error:any;
  sub:any;
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
    this.btags = [];
    this.exclusiveInd = INCLUDE_ALL;
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
            let btagArray:Array<string> = filterString.split(',');
            this.campaignFilterRequest.filters = btagArray;
            for (var i:number = 0; i < btagArray.length; i++) {
              this.btags[i] = new FilterItem();
              this.btags[i].id = btagArray[i];

              this.campaignFilterRequestFromDB.filters[i] = btagArray[i];
            }
          },
          error => this.error = <any>error
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedBtags:Array<string> = null) {
    this.close.emit(savedBtags);
    window.history.back();
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
        this.errorMsg = 'You must enter a btag list with this option!';
      } else {
        this.campaignFilterService
          .save(this.campaignFilterRequest, this.campaignId, FILTER_TYPE, this.exclusiveInd)
          .subscribe(
            campaignFilterResponse => {
              this.campaignFilterResponse = campaignFilterResponse;
              this.goNext();
            },
            error => this.error = <any>error
          );
      }
    }
  }

  addBtag():void {
    let aBtag:FilterItem = new FilterItem();
    aBtag.id = this.newBtag;
    this.btags.push(aBtag);
    this.campaignFilterRequest.filters.push(this.newBtag);
  }

  /**
   * remove selected btags from property btags.
   */
  removeBtags():void {
    this.btags = this.btags.filter(
      (mbr) => mbr.selected !== true
    );

    // create campaignFilterRequest
    this.campaignFilterRequest.filters = [];
    this.btags.forEach(btag => {
      this.campaignFilterRequest.filters.push(btag.id);
    });
  }

  toggleAll() {
    this.btags.forEach(btag => {
      btag.selected = !this.selectAll;
    });

  }

  private goNext() {
    let link = ['/bonus-review', this.campaignId];
    this.router.navigate(link);
  }
}

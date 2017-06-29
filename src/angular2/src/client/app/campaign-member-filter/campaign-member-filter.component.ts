import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../shared/index';

import {
  CampaignFilterResponse,
  CampaignFilterRequest,
  FilterItem,
  CampaignFilterService
} from '../shared/index';

const FILTER_TYPE:string = 'member';
const INCLUDE_ALL:string = 'INCLUDE_ALL';
const EXCLUDE:string = 'EXCLUDE_LIST';
const INCLUDE:string = 'INCLUDE_LIST';

@Component({
  moduleId: module.id,
  selector: 'target-audience',
  templateUrl: 'campaign-member-filter.component.html',
  styleUrls: ['campaign-member-filter.component.css']
})

// exclusiveInd A include all, B exclude, C include
export class CampaignMemberFilterComponent implements OnInit, OnDestroy {
  title:string = 'Target Audience';
  exclusiveInd:string;

  // an array of Member object. to be used in html with *ngFor="let member of members"
  members:Array<FilterItem>;

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

  // property initialization must be in constructor.
  constructor(private router:Router,
              private route:ActivatedRoute,
              private campaignFilterService:CampaignFilterService) {
    this.campaignFilterResponse = new CampaignFilterResponse();
    this.campaignFilterRequest = new CampaignFilterRequest();
    this.campaignFilterRequestFromDB = new CampaignFilterRequest();
    this.campaignFilterRequest.filters = [];
    this.campaignFilterRequestFromDB.filters = [];
    this.members = [];
    this.exclusiveInd = INCLUDE_ALL;
    this.selectAll = false;
  }

  /**
   * initialize filter request and filter table.
   * if getFilters throws http 404 error and error body has code 5269,
   * includeAll is true
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.campaignId = id;

      this.campaignFilterService.getFilters(this.campaignId, FILTER_TYPE)
        .subscribe(
          response => {
            this.campaignFilterRequestFromDB.exclusiveInd = response.exclusiveInd;
            this.campaignFilterResponse = response;

            if (response.exclusiveInd) {
              this.exclusiveInd = EXCLUDE;
            } else {
              this.exclusiveInd = INCLUDE;
            }
            // extract response filter string to members array
            let filterString = response.filter;
            let memberIdArray:Array<string> = filterString.split(',');
            this.campaignFilterRequest.filters = memberIdArray;
            for (var i:number = 0; i < memberIdArray.length; i++) {
              this.members[i] = new FilterItem();
              this.members[i].id = memberIdArray[i];

              this.campaignFilterRequestFromDB.filters[i] = memberIdArray[i];
            }
          },
          error => this.error = <any>error
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goNext() {
    if (NavbarComponent.showMerchantFilter === true) {
      let link = ['/merchant-filter', this.campaignId];
      this.router.navigate(link);
    } else {
      let link = ['/btag-filter', this.campaignId];
      this.router.navigate(link);
    }
  }

  goBack(savedCustomers:Array<string> = null) {
    this.close.emit(savedCustomers);
    window.history.back();
  }

  /**TODO: copying data approach not working when radio choice is includeAll, in this case
   *http.delete is still called if nothing in the template changes
   */
  save() {
    //if( !(this.exclusiveInd === INCLUDE_ALL)) {
    //    console.log('exclusiveInd --> ' + this.exclusiveInd);
    //}
    //if( this.campaignFilterRequest.filters.length === 0) {
    //    console.log('filter length is 0');
    //}

    if (this.exclusiveInd === EXCLUDE) {
      this.campaignFilterRequest.exclusiveInd = true;
    } else {
      this.campaignFilterRequest.exclusiveInd = false;
    }

    if (this.campaignFilterRequestFromDB.equals(this.campaignFilterRequest)) {
      this.goNext();
    } else {
      if (!(this.exclusiveInd === INCLUDE_ALL) && (this.campaignFilterRequest.filters.length === 0)) {
        this.errorMsg = 'You must enter a member list with this option!';
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

  /**
   * read the file contents into property members.
   * @param $event
   */
  changeListener($event:any):void {
    let self = this;
    let inputValue:any = $event.target;
    let file:File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onload = function (e) {
      let vars:Array<string> = myReader.result.split('\n');
      // for some reason, can't push the split result all at once
      vars.forEach(itm => {
        if (itm.endsWith('\r')) {
          itm = itm.substring(0, itm.length - 1);
        }
        self.campaignFilterRequest.filters.push(itm);
        let aMember = new FilterItem();
        aMember.id = itm;
        self.members.push(aMember);
      });
    };

    myReader.readAsText(file);
  }

  /**
   * remove selected member from property members.
   */
  removeMembers():void {
    this.members = this.members.filter(
      (mbr) => mbr.selected !== true
    );

    // create campaignFilterRequest
    this.campaignFilterRequest.filters = [];
    this.members.forEach(member => {
      this.campaignFilterRequest.filters.push(member.id);
    });
  }

  toggleAll($event:any) {
    this.members.forEach(member => {
      member.selected = this.selectAll;
    });
  }
}

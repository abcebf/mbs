import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CampaignFilterRequest, CampaignFilterResponse } from './campaign-filter';
import { AbstractHttpService } from '../base/abstract-http.service';

const INCLUDE_ALL:string = 'INCLUDE_ALL';

@Injectable()
export class CampaignFilterService extends AbstractHttpService {
  private campaignUrl:string = '/bonus-campaign-filters';
  private campaignId:number;

  constructor(http:Http) {
    super(http);
  }

  /**
   * example URL: http://localhost:8080/v1/bonus-campaign-filters/72&member
   *              http://localhost:8080/v1/bonus-campaign-filters/72&btag
   * @param id
   * @param filterType
   */
  getFilters(id:number, filterType:string):Observable<CampaignFilterResponse> {
    let url = `${this.campaignUrl}/${id}&${filterType}`;
    this.campaignId = id;

    return this.get(url);
  }

  save(campaignFilterRequest:CampaignFilterRequest,
       campaignId:number,
       filterType:string,
       exclusiveInd:string):Observable<CampaignFilterResponse> {

    let url = `${this.campaignUrl}/${campaignId}&${filterType}`;

    // exclusiveInd is passed in as string, so do not use strict comparison
    if (exclusiveInd === INCLUDE_ALL) {
      return this
        .delete(url);
    } else {
      return this
        .post(url, campaignFilterRequest);
    }
  }
}

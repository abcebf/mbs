import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CampaignConfig, CampaignParam }  from './index';
import { AbstractHttpService } from '../base/abstract-http.service';

@Injectable()
export class CampaignConfigService extends AbstractHttpService {
  private campaignConfigUrl = '/bonus-campaign-configs';
  private campaignId:number;

  constructor(http:Http) {
    super(http);
  }

  /**
   * Look up campaign configuration by campaign id.
   * @param id
   * @returns {Observable<CampaignConfig>}
   */
  getCampaignConfig(id:number):Observable<CampaignConfig> {
    let url = `${this.campaignConfigUrl}/${id}`;
    this.campaignId = id; // useless

    return this.get(url);
  }

  /**
   * get campaign other dropdown lists.
   * @param paramType
   * @return a list of parameters used for dropdowns
   */
  getCampaignParameters(paramType:string):Observable<Array<CampaignParam>> {
    let url = `/bonus-campaign-params/${paramType}`;
    return this.get(url);
  }

  /**
   * get campaign other dropdown lists.
   * @param paramType
   * @return a list of parameters used for dropdowns
   */
  getCampaignParameter(paramType:string, paramName:String):Observable<CampaignParam> {
    let url = `/bonus-campaign-params/${paramType}/${paramName}`;
    return this.get(url);
  }

  // save or update a new or existing campaign config. use POST for both
  save(campaignConfig:CampaignConfig, id:number):Observable<CampaignConfig> {
    let url = `${this.campaignConfigUrl}/${id}`;
    return this.post(url, campaignConfig);
  }
}


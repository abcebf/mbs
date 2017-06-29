import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AbstractHttpService } from '../base/abstract-http.service';
import { TxnType, Campaign, ReviewRequest } from './campaign';

@Injectable()
export class CampaignService extends AbstractHttpService {
  private campaignsUrl:string = `/bonus-campaigns`;

  constructor(http:Http) {
    super(http);
  }

  /**
   * lookup all campaigns from db.
   * @returns {Promise<R>|Promise<void>|Promise<T>|Q.Promise<void>|any<T>|any}
   */
  getCampaigns():Observable<{[key:string]:Array<Campaign>;}> {
    return this.get(this.campaignsUrl);
  }


  allowApprove():Observable<Boolean> {
    return this.get(this.campaignsUrl + '/allow-approve');
  }

  /**
   * get campaign transaction types.
   * @return Promise<Array<TxnType>>
   */
  getCampaignTxnTypes():Observable<Array<TxnType>> {
    return this.get('/bonus-campaign-types');
  }

  /**
   * Look up a campaign by id
   * @param id
   * @returns {Promise<Campaign>}
   */
  getCampaign(id:number):Observable<Campaign> {
    return this.get(`${this.campaignsUrl}/${id}`);
  }

  /**
   *  save a new campaign or update an existing campaign.
   *  @param campaign Campaign
   *  @return Promise<Campaign>
   */
  save(campaign:Campaign):Observable<Campaign> {
    if (campaign.id) {
      return this.post(`${this.campaignsUrl}/${campaign.id}`, campaign);
    }
    return this.put(this.campaignsUrl, campaign);
  }

  /**
   * can be used to Approve/Pending/Removed campaign. controller has 3 endpoints with similar structure.
   * @param reviewAction approved/pending/removed
   * @param id
   * @param comment
   * @returns {Observable<any>}
     */
  sendForReview(reviewAction: string, id: number, comment: string): Observable<Campaign> {
    let request = new ReviewRequest();
    request.comment = comment + ': ' + reviewAction;

    return this.post(`${this.campaignsUrl}/${id}/${reviewAction}`, request);
  }

  stopCampaign(id: number): Observable<Campaign> {
    return this.sendForReview('removed', id, 'dummy');
  }
}


"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var env_config_1 = require('./shared/config/env.config');
var CampaignService = (function () {
    function CampaignService(http) {
        this.http = http;
        this.campaignsUrl = env_config_1.Config.API + "/bonus-campaigns";
    }
    /*http.get return Observable<Response> .
     *toPromise(...) returns Promise<Response>,
     *then chaining returns Promise<Array<Campaign>>
     */
    CampaignService.prototype.getCampaigns = function () {
        return this.http.get(this.campaignsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CampaignService.prototype.getCampaign = function (id) {
        return this.getCampaigns()
            .then(function (campaigns) { return campaigns.find(function (campaign) { return campaign.id === id; }); });
    };
    // save a new campaign or updated campaign
    CampaignService.prototype.save = function (campaign) {
        if (campaign.id) {
            return this.post(campaign);
        }
        return this.put(campaign);
    };
    CampaignService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    // add new campaign
    CampaignService.prototype.put = function (campaign) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put(this.campaignsUrl, JSON.stringify(campaign), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Campaign
    CampaignService.prototype.post = function (campaign) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.campaignsUrl + "/" + campaign.id;
        return this.http
            .post(url, JSON.stringify(campaign), { headers: headers })
            .toPromise()
            .then(function () { return campaign; })
            .catch(this.handleError);
    };
    CampaignService = __decorate([
        core_1.Injectable()
    ], CampaignService);
    return CampaignService;
}());
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map

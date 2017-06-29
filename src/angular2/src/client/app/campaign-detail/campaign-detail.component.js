"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var campaign_1 = require('./../shared/campaign/campaign');
var CampaignDetailComponent = (function () {
    function CampaignDetailComponent(route, campaignService) {
        this.route = route;
        this.campaignService = campaignService;
        this.close = new core_1.EventEmitter();
        //todo: set title dynamically based on action (add/edit)
        this.title = 'Add/Edit a Campaign';
        this.typeCodes = [
            'P2P',
            'C2M',
            'Upload to wallet'
        ];
    }
    CampaignDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.campaignService.getCampaign(id)
                    .then(function (campaign) { return _this.campaign = campaign; });
                _this.title = 'Edit a Campaign';
            }
            else {
                _this.campaign = new campaign_1.Campaign();
                _this.title = 'Add a Campaign';
            }
        });
    };
    CampaignDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CampaignDetailComponent.prototype.goBack = function (savedCampaign) {
        if (savedCampaign === void 0) { savedCampaign = null; }
        this.close.emit(savedCampaign);
        window.history.back();
    };
    // used by both add and edit campaign
    CampaignDetailComponent.prototype.save = function () {
        var _this = this;
        this.campaignService
            .save(this.campaign)
            .then(function (campaign) {
            _this.campaign = campaign; // saved campaign, without id if new
            _this.goBack(campaign);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    __decorate([
        core_1.Input()
    ], CampaignDetailComponent.prototype, "campaign");
    __decorate([
        core_1.Output()
    ], CampaignDetailComponent.prototype, "close");
    CampaignDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-campaign-detail',
            templateUrl: 'campaign-detail.component.html',
            styleUrls: ['campaign-detail.component.css']
        })
    ], CampaignDetailComponent);
    return CampaignDetailComponent;
}());
exports.CampaignDetailComponent = CampaignDetailComponent;
//# sourceMappingURL=campaign-detail.component.js.map

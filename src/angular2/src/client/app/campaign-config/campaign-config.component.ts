import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignConfig, CampaignParam, CampaignConfigService, ParamType } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'my-campaign-config',
  templateUrl: 'campaign-config.component.html',
  styleUrls: ['campaign-config.component.css']
})

export class CampaignConfigComponent implements OnInit, OnDestroy {
  title:string = 'Bonus Configuration';
  campaignId:number;

  // dropdown list values
  bonusBaseTypes:Array<CampaignParam>;
  bonusBasePerTypes:Array<CampaignParam>;
  bonusCreditedMemberTypes:Array<CampaignParam>;
  bonusCreditedMemberOfTypes:Array<CampaignParam>;

  @Input()
  campaignConfig:CampaignConfig; // campaign config obtained from template
  campaignConfigFromDB:CampaignConfig;

  @Output()
  close = new EventEmitter();

  error:any;
  sub:any;
  errorMsg:string;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private campaignConfigService:CampaignConfigService) {
    this.campaignConfig = new CampaignConfig();
    this.campaignConfigFromDB = new CampaignConfig();
    this.bonusBaseTypes = [];
    this.bonusBasePerTypes = [];
    this.bonusCreditedMemberTypes = [];
    this.bonusCreditedMemberOfTypes = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.campaignConfigService.getCampaignParameters(ParamType[ParamType.BONUS_BASED_ON_TYPES])
        .subscribe(
          response => {
            this.bonusBaseTypes = response;
            // initial value if user does not click the dropdown list
            this.campaignConfig.bonusBase = response[0].paramName;
            this.campaignConfigFromDB.bonusBase = response[0].paramName;
          },
          error => this.error = <any>error
        );

      this.campaignConfigService.getCampaignParameters(ParamType[ParamType.BONUS_BASED_PER_TYPES])
        .subscribe(
          response => {
            this.bonusBasePerTypes = response;
            this.campaignConfig.bonusMethod = response[0].paramName;
            this.campaignConfigFromDB.bonusMethod = response[0].paramName;
          },
          error => this.error = <any>error
        );

      this.campaignConfigService.getCampaignParameters(ParamType[ParamType.BONUS_CREDITED_TO_MEMBER_TYPES])
        .subscribe(
          response => {
            this.bonusCreditedMemberTypes = response;
            this.campaignConfig.bonusCreditedMethod = response[0].paramName;
            this.campaignConfigFromDB.bonusCreditedMethod = response[0].paramName;
          },
          error => this.error = <any>error
        );

      this.campaignConfigService.getCampaignParameters(ParamType[ParamType.BONUS_CREDITED_TO_MEMBER_OF_TYPES])
        .subscribe(
          response => {
            this.bonusCreditedMemberOfTypes = response;
            this.campaignConfig.bonusCreditedBy = response[0].paramName;
            this.campaignConfigFromDB.bonusCreditedBy = response[0].paramName;
          },
          error => this.error = <any>error
        );

      let id = +params['id'];
      this.campaignId = id;
      this.campaignConfigService.getCampaignConfig(id)
        .subscribe(
          response => {
            this.campaignConfig = response;
            this.campaignConfigFromDB.copy(response);
          },
          error => this.error = <any>error
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack(savedCampaignConfig:CampaignConfig = null) {
    this.close.emit(savedCampaignConfig);

    window.history.back();
  }

  goNext() {
    let link = ['/target-audience', this.campaignId];
    this.router.navigate(link);
  }

  /**
   * used by both add and update campaign config.
   */
  save(dirtyForm:boolean) {
    if (dirtyForm) {
      this.campaignConfigService
        .save(this.campaignConfig, this.campaignId)
        .subscribe(
          response => {
            this.campaignConfig = response;
            this.goNext();
          },
          error => this.error = <any>error
        );
    } else {
      this.goNext();
    }
  }
}



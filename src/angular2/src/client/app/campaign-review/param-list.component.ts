import { Component, Input, OnInit, OnChanges } from '@angular/core';

import {
  CampaignConfigService,
} from '../shared/index';


/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'param-list',
  template: `
    <select disabled>
      <option>{{paramValue}}</option>
    </select>  
  `
})

export class ParamListComponent implements OnInit, OnChanges {
  @Input() paramType: string;
  @Input() paramName: string;
  paramValue: string;
  error: any;

  constructor(private campaignConfigService:CampaignConfigService) { }

  ngOnInit() {
    this.fetchParamValueOf(this.paramType, this.paramName);
  }

  fetchParamValueOf(paramType:string, paramName:string) {
    if (paramType && paramName) {
      this.campaignConfigService.getCampaignParameter(paramType, paramName)
        .subscribe(
          response => {
            this.paramValue = response.paramValue;
          },
          error => this.error = <any>error);
    }
  }

  ngOnChanges(changes:any) {
    if (changes.paramType && changes.paramType.currentValue) {
      this.paramType = changes.paramType.currentValue;
    }
    if (changes.paramName && changes.paramName.currentValue) {
      this.paramName = changes.paramName.currentValue;
    }

    this.fetchParamValueOf(this.paramType, this.paramName);
  }
}

export class CampaignConfig {
    bonusBase: string; // Transaction Fee or Volume
    bonusCreditedAmount: number; //5% or 5$
    bonusCreditedBy: string; // Volume or Fee
    bonusCreditedMethod: string; // $ %
    bonusMethod: string; // Transfer, FirstTransfer
    maxBonusAmountPerMember: number;//
    maxBonusAmountPerTrans: number;//
    minQualifyAmount: number;//
    bonusCampaignId: number;

    copy(c: CampaignConfig) {
        this.bonusBase = c.bonusBase;
        this.bonusCreditedAmount = c.bonusCreditedAmount;
        this.bonusCreditedBy = c.bonusCreditedBy;
        this.bonusCreditedMethod = c.bonusCreditedMethod;
        this.bonusMethod = c.bonusMethod;
        this.maxBonusAmountPerMember = c.maxBonusAmountPerMember;
        this.maxBonusAmountPerTrans = c.maxBonusAmountPerTrans;
        this.minQualifyAmount = c.minQualifyAmount;
        this.bonusCampaignId = c.bonusCampaignId;
    }

    equals(c: CampaignConfig): boolean {
        return  this.bonusBase === c.bonusBase &&
        this.bonusCreditedAmount === c.bonusCreditedAmount &&
        this.bonusCreditedBy === c.bonusCreditedBy &&
        this.bonusCreditedMethod === c.bonusCreditedMethod &&
        this.bonusMethod === c.bonusMethod &&
        this.maxBonusAmountPerMember === c.maxBonusAmountPerMember &&
        this.maxBonusAmountPerTrans === c.maxBonusAmountPerTrans &&
        this.minQualifyAmount === c.minQualifyAmount &&
        this.bonusCampaignId === c.bonusCampaignId;
    }
}

export class CampaignParam {
  paramName:string;
  paramValue:string;
}

export enum ParamType {
  BONUS_BASED_ON_TYPES = 0,
  BONUS_BASED_PER_TYPES = 1,
  BONUS_CREDITED_TO_MEMBER_TYPES = 2,
  BONUS_CREDITED_TO_MEMBER_OF_TYPES = 3
}
/*
 * Bonus Configuration Object
 */

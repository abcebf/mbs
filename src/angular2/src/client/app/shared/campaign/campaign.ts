export class Campaign {
  id:number;
  name:string;
  owner:string;
  typeCode:string;
  totalBudget:number;
  awardedAmount:number;
  effectiveTime:number;
  expiryTime:number;
  status:string;

  copy(c: Campaign) {
    this.id = c.id;
    this.name = c.name;
    this.owner = c.owner;
    this.typeCode = c.typeCode;
    this.totalBudget = c.totalBudget;
    this.awardedAmount = c.awardedAmount;
    this.effectiveTime = c.effectiveTime;
    this.expiryTime = c.expiryTime;
    this.status = c.status;
  }

  get budgetExecuted() : String {
    if (this.awardedAmount === -1) {
      return 'N/A';
    } else {
      return Math.floor(this.awardedAmount * 100 / this.totalBudget) + '%';
    }
  }

  equals(c: Campaign): boolean {
    return this.id === c.id &&
        this.name === c.name &&
        this.owner === c.owner &&
        this.typeCode === c.typeCode &&
        this.totalBudget === c.totalBudget &&
        this.awardedAmount === c.awardedAmount &&
        this.effectiveTime === c.effectiveTime &&
        this.expiryTime === c.expiryTime &&
        this.status === c.status;
  }
}

export class TxnType {
  code:string;
  name:string;
  description:string;
}

// pending request body only has one element : comment
export class ReviewRequest {
  comment: string;
}


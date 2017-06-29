import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budgetExecuted'
})

export class BudgetFilterPipe implements PipeTransform {
  transform(campaign: any, args: any[] = null): any {
    if (campaign.awardedAmount === -1) {
      return 'N/A';
    } else {
      return Math.floor(campaign.awardedAmount * 100 / campaign.totalBudget) + '%';
    }
  }
}

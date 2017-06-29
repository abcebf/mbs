export class CampaignFilterRequest {
    filters: Array<string> = new Array<string>();
    exclusiveInd: boolean = true;

    equals(c:CampaignFilterRequest): boolean {
        return this.exclusiveInd === c.exclusiveInd && this.compareArray(c.filters);
    }

    private compareArray(ss:Array<string>): boolean {
        if (ss.length !== this.filters.length) {
            return false;
        }
        for(let s of this.filters) {
            if(ss.indexOf(s) < 0) {
                return false;
            }
        }
        return true;
    }
}

export class CampaignFilterResponse {
    bonusCampaignId: number;
    filterType: string;
    filter: string;
    exclusiveInd: boolean;
}

/**
 * used by each type of filter: member, merchant or btag
 */
export class FilterItem {
    id: string;
    selected: boolean = false;
}

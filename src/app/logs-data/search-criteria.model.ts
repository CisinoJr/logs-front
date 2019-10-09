export interface ISearchCriteria {
  ip?: string;
  startDate?: any;
  endDate?: any;
}

export class SearchCriteria implements ISearchCriteria {
  constructor(
    public ip?: string,
    public startDate?: any,
    public endDate?: any
  ) { }
}

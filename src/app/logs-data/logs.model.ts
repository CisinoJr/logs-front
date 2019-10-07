export interface ILogs {
  id?: number;
  logDate?: any;
  ip?: string;
  request?: string;
  httpStatusCode?: number;
  userAgent?: string;
}

export class Logs implements ILogs {
  constructor(
    public id?: number,
    public logDate?: any,
    public ip?: string,
    public request?: string,
    public httpStatusCode?: number,
    public userAgent?: string
  ) { }
}

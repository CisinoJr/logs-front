import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LogsDataService } from './logs-data.service';
import { ILogs } from './logs.model';
import { HttpResponse } from '@angular/common/http';
import { ISearchCriteria } from './search-criteria.model';

export class LogsDataSource implements DataSource<ILogs> {

  private logsSubject = new BehaviorSubject<ILogs[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public dataSourceLength: number;

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private logService: LogsDataService
  ) { }

  loadLessons(searchCriteria: ISearchCriteria, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);
    this.logService.findAll({
      page: pageIndex,
      size: pageSize,
      sort: this.sort()
    }, searchCriteria).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((response: HttpResponse<ILogs[]>) => {
      this.dataSourceLength = parseInt(response.headers.get('X-Total-Count'), 10);
      this.logsSubject.next(response.body);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<ILogs[]> {
    return this.logsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.logsSubject.complete();
    this.loadingSubject.complete();
  }

  private sort() {
    const result = ['id,asc'];
    return result;
  }
}


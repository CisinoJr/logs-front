import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LogsDataService } from './logs-data.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchCriteria, ISearchCriteria } from './search-criteria.model';
import { ParseLinks } from '../shared/utls/services/parse-links.service';
import { LogsDataSource } from './logs.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-logs-data',
  templateUrl: './logs-data.component.html',
  styleUrls: ['./logs-data.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LogsDataComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchButton', { read: ElementRef, static: true }) searchButton: ElementRef;

  displayedColumns = ['id', 'ip', 'httpStatus', 'request', 'date', 'userAgent', 'actions'];

  searchCriteria: SearchCriteria;
  dataSource: LogsDataSource;

  searchFormGroup: FormGroup;

  constructor(
    protected logsService: LogsDataService,
    protected parseLinks: ParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createSearchFormGroup();
    this.loadAll();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.searchEvent();
  }

  loadAll() {
    this.dataSource = new LogsDataSource(this.logsService);
    this.dataSource.loadLessons(this.searchCriteria, 0, 10);
  }

  loadLessonsPage() {
    this.searchCriteria = this.createSearchCriteria();
    this.dataSource.loadLessons(this.searchCriteria,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  cleanSearchForm(): void {
    this.searchCriteria = null;
    this.searchFormGroup.reset();
    this.dataSource.loadLessons(this.searchCriteria,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  private searchEvent(): void {
    fromEvent(this.searchButton.nativeElement, 'click')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  private createSearchFormGroup(): void {
    this.searchFormGroup = this.formBuilder.group({
      ip: [null],
      startDate: [null],
      endDate: [null]
    });
  }

  private createSearchCriteria(): ISearchCriteria {
    const ip = this.searchFormGroup.get(['ip']);
    const startDate = this.searchFormGroup.get(['startDate']);
    const endDate = this.searchFormGroup.get(['endDate']);
    let search: ISearchCriteria;
    if (ip.value) {
      search = new SearchCriteria(ip.value, null, null);
    } else if (startDate.value && endDate.value) {
      search = new SearchCriteria(null, startDate.value, endDate.value);
    } else {
      this.searchValidationAlert();
    }

    return search;
  }

  private searchValidationAlert(): void {
    Swal.fire(
      'Atenção',
      'Favor selecionar o período, ou, ip',
      'warning'
    );
  }

  deleteLog(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter essa ação',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deletar'
    }).then((result) => {
      if (result.value) {
        this.logsService.delete(id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'O registro foi deletado com sucesso!',
              'success'
            );
            this.cleanSearchForm();
          }
        );
      }
    });
  }

}

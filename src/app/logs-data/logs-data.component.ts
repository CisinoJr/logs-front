import { Component, OnInit, ViewChild } from '@angular/core';
import { ILogs } from './logs.model';
import { LogsDataService } from './logs-data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-logs-data',
  templateUrl: './logs-data.component.html',
  styleUrls: ['./logs-data.component.scss']
})
export class LogsDataComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<ILogs>;
  displayedColumns = ['id', 'ip', 'httpStatus', 'request', 'date', 'userAgent'];

  constructor(
    private logsService: LogsDataService
  ) { }

  ngOnInit(): void {
    this.logsService.findAll().subscribe((logs: []) => {
      this.dataSource = new MatTableDataSource(logs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

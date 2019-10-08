import { Component, OnInit, ViewChild } from '@angular/core';
import { ILogs } from './logs.model';
import { LogsDataService } from './logs-data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logs-data',
  templateUrl: './logs-data.component.html',
  styleUrls: ['./logs-data.component.scss']
})
export class LogsDataComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<ILogs>;
  displayedColumns = ['id', 'ip', 'httpStatus', 'request', 'date', 'userAgent', 'actions'];

  constructor(
    private logsService: LogsDataService
  ) {
  }

  ngOnInit(): void {
    this.loadAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadAll() {
    this.logsService.findAll().subscribe((response: HttpResponse<ILogs[]>) => {
      this.dataSource = new MatTableDataSource(response.body);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
            this.loadAll();
          }
        );
      }
    });
  }
}

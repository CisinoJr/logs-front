import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsDataComponent } from './logs-data/logs-data.component';
import { LogsFormComponent } from './logs-data/form/logs-form.component';
import { LogsResolve } from './logs-data/logs-resolve.service';
import { PaginationParamsResolver } from './shared/utls/services/pagination-params-resolver.service';

const routes: Routes = [
  {
    path: 'logs',
    component: LogsDataComponent,
    resolve: {
      pagingParams: PaginationParamsResolver
    },
    data: {
      defaultSort: 'id,asc',
    }
  },
  {
    path: 'logs/:id',
    children: [
      {
        path: 'visualizar',
        component: LogsFormComponent,
        resolve: {
          log: LogsResolve
        },
        data: {
          viewMode: true
        }
      },
      {
        path: 'editar',
        component: LogsFormComponent,
        resolve: {
          log: LogsResolve,
        },
        data: {
          viewMode: false
        }
      }
    ]
  },
  {
    path: 'novo',
    component: LogsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsDataComponent } from './logs-data/logs-data.component';
import { LogsFormComponent } from './logs-data/form/logs-form.component';

const routes: Routes = [
  {
    path: 'logs',
    component: LogsDataComponent,
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

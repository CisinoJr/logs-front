import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsInfoComponent } from './logs-info/logs-info.component';


const routes: Routes = [
  {
    path: 'logs', component: LogsInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LogsInfoComponent];

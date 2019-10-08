import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogsDataComponent } from './logs-data.component';
import { LogsDataService } from './logs-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LogsFormComponent } from './form/logs-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogsResolve } from './logs-resolve.service';
import { DisableControlDirective } from '../disable-control.directive';

@NgModule({
  declarations: [
    LogsDataComponent,
    LogsFormComponent,
    DisableControlDirective
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LogsDataComponent,
    LogsFormComponent
  ],
  providers: [LogsDataService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LogsDataModule { }

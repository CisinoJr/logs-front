import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogsDataComponent } from './logs-data.component';
import { LogsDataService } from './logs-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LogsFormComponent } from './form/logs-form.component';

@NgModule({
  declarations: [
    LogsDataComponent,
    LogsFormComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
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

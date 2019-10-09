import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogsDataComponent } from './logs-data.component';
import { LogsDataService } from './logs-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LogsFormComponent } from './form/logs-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from '../disable-control.directive';
import { UploadModule } from '../shared/components/upload/upload.module';
import { ParseLinks } from '../shared/utls/services/parse-links.service';
import { PaginationUtil } from '../shared/utls/services/pagination-util.service';

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
    RouterModule,
    UploadModule
  ],
  exports: [
    LogsDataComponent,
    LogsFormComponent
  ],
  providers: [LogsDataService, ParseLinks, PaginationUtil],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LogsDataModule { }

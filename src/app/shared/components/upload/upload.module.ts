import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatIconModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog-component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule
  ],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService],
})
export class UploadModule {}

import { NgModule } from '@angular/core';
import { UploadModule } from './components/upload/upload.module';

@NgModule({
  imports: [UploadModule],
  exports: [UploadModule],
  providers: [],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
];

@NgModule({
  imports: [
    materialModules,
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule { }

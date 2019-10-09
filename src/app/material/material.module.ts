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
  MatTableModule,
  MatDatepickerModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
  MatDatepickerModule,
  MatMomentDateModule,
  MatProgressSpinnerModule
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

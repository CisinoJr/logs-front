import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatListModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatToolbarModule
];

@NgModule({
  imports: [
    materialModules,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    materialModules,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }

import { Component, OnInit } from '@angular/core';
import { ILogs, Logs } from '../logs.model';
import { LogsDataService } from '../logs-data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
const moment = _moment;

@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LogsFormComponent implements OnInit {

  entity: ILogs;

  formGroup: FormGroup;
  alert = ' é Obrigatório!';

  constructor(
    private service: LogsDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.entity = new Logs();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      logDate: [new FormControl(moment([2017, 0, 1])), Validators.required],
      ip: [null, Validators.required],
      request: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      httpStatusCode: [null, Validators.required],
      userAgent: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      validate: ''
    });
  }

  onSubmit(value: any) {
    this.entity = value;

    this.service.create(this.entity).subscribe((res) => {
      this.router.navigate(['/logs']);
    });
  }

}

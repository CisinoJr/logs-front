import { Component, OnInit } from '@angular/core';
import { ILogs, Logs } from '../logs.model';
import { LogsDataService } from '../logs-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.scss']
})
export class LogsFormComponent implements OnInit {

  entity: ILogs;

  formGroup: FormGroup;

  constructor(
    private service: LogsDataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.entity = new Logs();
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      logDate: [null, Validators.required],
      ip: [null, Validators.required],
      request: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      httpStatusCode: [null, Validators.required],
      userAgent: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      validate: ''
    });
  }

}

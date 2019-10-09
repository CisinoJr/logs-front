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
import Swal from 'sweetalert2';

const moment = _moment;

@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LogsFormComponent implements OnInit {

  entity: ILogs;

  isDisabled = false;

  formGroup: FormGroup;
  alert = ' é Obrigatório!';
  code: number;
  title = `Cadastro de Log`;

  constructor(
    private service: LogsDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const numberRegex: RegExp = /^\d+$/;

    this.formGroup = this.formBuilder.group({
      id: [null],
      logDate: [new FormControl(moment()), [Validators.required]],
      ip: [null, Validators.required],
      request: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      httpStatusCode: [null, [Validators.required, Validators.pattern(numberRegex)]],
      userAgent: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      validate: ''
    });

    this.activatedRoute.data.subscribe(({ log, viewMode }) => {
      if (log) {
        this.isDisabled = viewMode;
        this.title = viewMode ? `Visualizar Log: ${log.id}` : `Editando Log: ${log.id}`;
        this.loadEntity(log);
      }
    });
  }

  getHttpStatusErrorMessage(control) {
    return this.formGroup.get('httpStatusCode').getError('pattern') ? 'Favor inserir somente números' : `Https Status ${this.alert}`;
  }

  onSubmit(value: any) {
    this.entity = value;

    if (this.entity && this.entity.id) {
      this.service.update(this.entity).subscribe((res) => {
        this.showMessage('Atualizar Log', 'Log atualizado com sucesso');
      });
    } else {
      this.service.create(this.entity).subscribe((res) => {
        this.showMessage('Incluir Novo Log', 'Log criado com sucesso');
      });
    }
  }

  previousState() {
    window.history.back();
  }

  private loadEntity(log: ILogs): void {
    this.formGroup.patchValue(
      {
        id: log.id,
        logDate: log.logDate,
        ip: log.ip,
        request: log.request,
        httpStatusCode: log.httpStatusCode,
        userAgent: log.userAgent
      }
    );
  }

  private showMessage(swalTitle: string, message: string) {
    Swal.fire({
      title: swalTitle,
      text: message,
      timer: 1000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {
      }
    }).then(() => {
      this.router.navigate(['/logs']);
    });
  }


}

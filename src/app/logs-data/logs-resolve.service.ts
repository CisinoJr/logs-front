import { HttpResponse } from '@angular/common/http';
import { Logs, ILogs } from './logs.model';
import { of } from 'rxjs';
import { RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LogsDataService } from './logs-data.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/**
 * Esse service permite executar uma requisição a API ao clicar em um link de
 * editar ou visualizar, já disponibilizando o objeto para o componente.
 */
@Injectable({ providedIn: 'root' })
export class LogsResolve implements Resolve<ILogs> {
  constructor(private service: LogsDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(map((response: HttpResponse<ILogs>) => response.body));
    }
    return of(new Logs());
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { tap, delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // esta funcion es la que se ejecuta en cada peticion
    return next
      .handle(request) // gestiona todos los request y retorna un observable
      .pipe(
        tap((value) => this.spinnerService.show()), // captura la peticion cuando esta activa e invoca a la funcion show del servicio
        finalize(() => this.spinnerService.hide()) // captura el momento exacto en que termina de ejecutarse la peticion y ejecuta hide
      );
  }
}

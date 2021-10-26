import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  timestamp: string;
  authorization: string;

  constructor(
    private router: Router
  ) {

  }

  intercept(httpRequest: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

    if (httpRequest.url.includes(environment.server_base_url)) {

      this.authorization = "Bearer "+JSON.parse(sessionStorage.getItem("authorization"));

      this.timestamp = Date.now().toString();
      const text = `${environment.api_key}||${this.timestamp}`;
      const hash = sha512(text)

      return handler.handle(
        httpRequest.clone({
          headers: httpRequest.headers.set('Authorization', this.authorization)
            .append('timestamp', this.timestamp)
            .append('api_key', hash)
        })
      ).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 403 || (error.status == 401 && !error.message.includes('is required for this action'))) {
            sessionStorage.removeItem('user_details');
            sessionStorage.removeItem('Authorization');
            this.router.navigateByUrl('/login');
          }
          return throwError(error);
        })
      )
    }

    return handler.handle(httpRequest);
  }

}

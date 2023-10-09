import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders }
  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

    intercept(req : HttpRequest<unknown>, next : HttpHandler) : Observable<HttpEvent<unknown>> {
      let headers: HttpHeaders = new HttpHeaders();

      headers = headers.append("x-rapidapi-key", "5b90c16d764a13008b180becf77abd0b");
      headers = headers.append("x-rapidapi-host", "v3.football.api-sports.io");

      const httpReq = req.clone({
        method: 'GET',
        headers: headers,
      });
      return next.handle(httpReq);
    }
}

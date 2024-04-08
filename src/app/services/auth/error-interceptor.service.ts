import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'


@Injectable({
  providedIn: 'root'
})


export class ErrorInterceptorService {


  constructor() { }
  

  intercept(httpRequest: HttpRequest<any>, httpResponse: HttpHandler): Observable<HttpEvent<any>> {
    return httpResponse.handle(httpRequest).pipe(
      catchError(error => {
        console.error(error)
        return throwError(()=>error)
      })
    )
  }
}

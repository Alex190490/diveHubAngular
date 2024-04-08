import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SessionStorageService } from '../sessionStorage/session-storage.service'


@Injectable({
  providedIn: 'root'
})


export class JwtInterceptorService implements HttpInterceptor{

  
  constructor(
    private session: SessionStorageService
  ) { }


  intercept(httpRequest: HttpRequest<any>, httpResponse: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session.getItem("token")

    if (token!=""||token!=null) {
      httpRequest = httpRequest.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': "Bearer " + token,
          },
        }
      )
    }
    return httpResponse.handle(httpRequest)
  }
  
}

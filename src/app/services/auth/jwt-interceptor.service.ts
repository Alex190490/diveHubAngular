import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})


export class JwtInterceptorService implements HttpInterceptor{

  
  constructor() { }


  intercept(httpRequest: HttpRequest<any>, httpResponse: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("token")
    
    if (token!="") {
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

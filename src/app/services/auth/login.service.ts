import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map, tap, throwError } from 'rxjs'
import { LoginRequest } from '../../Clases/user/loginRequest'
import { environment } from '../../../environments/environment'
import { SignUpRequest } from '../../Clases/user/SignUpRequest'


@Injectable({
  providedIn: 'root'
})


export class LoginService {



  constructor(private httpClient: HttpClient) {}



  login(credentials: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(environment.urlAuth + "/login", credentials).pipe(
      tap(userData => {
        sessionStorage.setItem("token", userData.token)
        return userData
      }),
      map(userData => userData.token),
      catchError(this.handleError)
    )
  }

  // signUp(credentials: SignUpRequest): Observable<any> {
  //   return this.httpClient.post<any>(environment.urlAuth + "/signup", credentials).pipe(
  //     tap(userData => {
  //       sessionStorage.setItem("token", userData.token)
  //       return userData
  //     }),
  //     map(userData => userData.token),
  //     catchError(this.handleError)
  //   )
  // }


  logout(): void {
    sessionStorage.removeItem("token")
  }


  private handleError(response: HttpErrorResponse) {
    console.error('Error en la solicitud:', response);
    return throwError('Datos de cuenta no existen o son erróneos');
  }
}

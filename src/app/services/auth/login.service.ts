import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map, tap, throwError } from 'rxjs'
import { LoginRequest } from './loginRequest'
import { environment } from '../../../environments/environment'
import { SignUpRequest } from './SignUpRequest'
import { SessionStorageService } from '../sessionStorage/session-storage.service'


@Injectable({
  providedIn: 'root'
})


export class LoginService {



  constructor(
    private httpClient: HttpClient,
    private session: SessionStorageService
  ) {}



  login(credentials: LoginRequest): Observable<any> {    
    return this.httpClient.post<any>(environment.urlAuth + "/login", credentials).pipe(
      tap(userData => {
        this.session.setItem("token", userData.token)

        const payload = JSON.parse(atob(this.session.getItem("token").split('.')[1]))
        const userEmail = payload.sub
        this.session.setItem('email',userEmail)

        return userData
      }),
      map(userData => userData.token),
      catchError(this.handleError)
    )
  }

  signUp(credentials: SignUpRequest): Observable<any> {
    return this.httpClient.post<any>(environment.urlAuth + "/signup", credentials).pipe(
      tap(userData => {
        this.session.setItem("token", userData.token)
        return userData
      }),
      map(userData => userData.token),
      catchError(this.handleError) 
    )
  }


  logout(): void {
    this.session.clear()
  }


  private handleError(response: HttpErrorResponse) {
    console.error('Error en la solicitud:', response);
    return throwError(() => new Error('Datos de cuenta no existen o son erróneos'));
  }
}

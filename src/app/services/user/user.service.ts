import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { User } from '../../Clases/user/user'
import { UserRequest } from '../../Clases/user/user-request'


@Injectable({
  providedIn: 'root'
})


export class UserService {


  constructor(private httpCliente : HttpClient) { }



  getUser(): Observable<any> {
    const token = sessionStorage.getItem('token')

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userEmail = payload.sub
      return this.httpCliente.get<User>(environment.urlUser + "/" + userEmail)
    } 
    return of(null) 
  }


  updateUser(user: UserRequest): Observable<User> {
    const token = sessionStorage.getItem('token')
    
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userEmail = payload.sub
      return this.httpCliente.put<User>(environment.urlUser + "/" + userEmail, user)
    } else {
      console.error('Token not found in sessionStorage')
      return throwError('Token not found')
    }
  }
}

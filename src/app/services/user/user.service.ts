import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { User } from '../../Clases/user/user'
import { UserRequest } from '../../Clases/user/user-request'
import { SessionStorageService } from '../sessionStorage/session-storage.service'


@Injectable({
  providedIn: 'root'
})


export class UserService {


  constructor(
    private httpCliente : HttpClient,
    private session: SessionStorageService
  ) { }



  getAllUsers(): Observable<User[]> {
    return this.httpCliente.get<User[]>(environment.urlUser)
  }

  
  getUser(): Observable<any> {
    const token = this.session.getItem('token')

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userEmail = payload.sub
      this.session.setItem('email',userEmail)
      return this.httpCliente.get<User>(environment.urlUser + "/" + userEmail)
    } 
    return of(null) 
  }


  updateUser(user: UserRequest): Observable<User> {
    return this.httpCliente.put<User>(environment.urlUser + "/" + user.email, user)
  }


  deleteUser(email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlUser + "/" + email)
  }


  isAdmin(): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlUser + "/isAdmin/" + this.session.getItem('email'))
  }
}

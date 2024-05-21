import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { environment } from '../../../environments/environment'
import { User } from '../../Clases/user/user'
import { SessionStorageService } from '../sessionStorage/session-storage.service'
import { UserRequestUpdate } from '../../Clases/user/user-request-update'


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


  updateUser(user: any, email: string): Observable<User> {
    return this.httpCliente.put<User>(environment.urlUser + "/" + email, user)
  }


  deleteUser(email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlUser + "/" + email)
  }


  isAdmin(): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlUser + "/isAdmin/" + this.session.getItem('email'))
  }


  existsNickname(nickname: string): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlUser + "/existsNickname/" + nickname)
  }


  existsEmail(email: string): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlUser + "/existsEmail/" + email)
  }
}

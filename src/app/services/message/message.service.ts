import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../Clases/Message/message';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class MessageService {

  constructor(private httpCliente: HttpClient) { }


  
  getMessageById(email : string): Observable<Message> {
    return this.httpCliente.get<Message>(environment.urlMessage+"/allByUser/"+email)
  }

  addMessage(message: Message): Observable<Message> {
    return this.httpCliente.post<Message>(environment.urlMessage+"/addMessage", message)
  }
}

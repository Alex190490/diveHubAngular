import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Detail } from '../../Clases/Detail/detail';
import { DetailRequest } from '../../Clases/Detail/detail-request';


@Injectable({
  providedIn: 'root'
})


export class DetailsService {

  
  constructor(private httpCliente : HttpClient) { }



  getDetailsByUser(email: string): Observable<Detail[]> {
    return this.httpCliente.get<Detail[]>(environment.urlDetail + "/" + email)
  }

  postDetails(detail: DetailRequest): Observable<Detail> {
    return this.httpCliente.post<Detail>(environment.urlDetail + "/addDetail", detail)
  }

  removeDetails(email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlDetail+"/clean/"+email)
  }
}

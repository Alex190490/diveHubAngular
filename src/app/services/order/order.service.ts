import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { Order } from '../../Clases/Order/order'
import { OrderRequest } from '../../Clases/Order/order-request'


@Injectable({
  providedIn: 'root'
})


export class OrderService {


  constructor(private httpCliente: HttpClient) {}

  

  getOrderByUser(email: string): Observable<Order> {
    return this.httpCliente.get<Order>(environment.urlOrder + "/" + email)
  }

  addOrder(order: OrderRequest): Observable<Order> {
    return this.httpCliente.post<Order>(environment.urlOrder, order)
  }

  removeOrder(email: string): Observable<Object> {
    return this.httpCliente.delete(environment.urlOrder + "/clean/" + email)
  }
}

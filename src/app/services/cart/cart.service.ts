import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart } from '../../Clases/Cart/cart';
import { CartRequest } from '../../Clases/Cart/cart-request';


@Injectable({
  providedIn: 'root'
})


export class CartService {

  constructor(private httpCliente: HttpClient) {}

  getListByUser(email: string): Observable<Cart[]> {
    return this.httpCliente.get<Cart[]>(environment.urlCart + "/" + email)
  }

  countByClient(email: string): Observable<number> {
    return this.httpCliente.get<number>(environment.urlCart + "/count/" + email)
  }

  updateProductQuantity(userEmail: string, productId: number, quantity: number): Observable<Cart> {
    return this.httpCliente.get<Cart>(environment.urlCart+"/updateQuantity/"+userEmail+"/"+productId+"/"+quantity);
  }

  addProduct(cart: CartRequest): Observable<Cart> {
    return this.httpCliente.post<Cart>(environment.urlCart, cart)
  }

  removeProduct(productId: number): Observable<any> {
    return this.httpCliente.delete(environment.urlCart + "/clean/" + productId)
  }

  removeAllProducts(email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlCart + "/cleanAll/" + email)
  }

  getTotalPrice(email: string): Observable<number>{
    return this.httpCliente.get<number>(environment.urlCart + "/totalPrice/" + email)
  }
}

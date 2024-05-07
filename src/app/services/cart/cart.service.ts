import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../../Clases/Cart/cart';
import { CartRequest } from '../../Clases/Cart/cart-request';


@Injectable({
  providedIn: 'root'
})


export class CartService {


  constructor(private httpCliente: HttpClient) {}



  getListByUser(email: string): Observable<Cart[]> {
    return this.httpCliente.get<Cart[]>(environment.urlCart + "/all/" + email)
  }

  countByClient(email: string): Observable<number> {
    return this.httpCliente.get<number>(environment.urlCart + "/count/" + email)
  }

  updateProductQuantity(userEmail: string, productId: number, quantity: number): Observable<any> {
    return this.httpCliente.get(environment.urlCart+"/updateQuantity/"+productId+"/"+quantity+"/"+userEmail);
  }

  addProduct(cart: CartRequest): Observable<any> {
    return this.httpCliente.post<any>(environment.urlCart, cart)
  }

  removeProduct(productId: number, email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlCart + "/clean/" + productId + "/" + email)
  }

  removeAllProducts(email: string): Observable<any> {
    return this.httpCliente.delete(environment.urlCart + "/cleanAll/" + email)
  }

  calculateTotalCart(email: string): Observable<number>{
    return this.httpCliente.get<number>(environment.urlCart + "/totalPrice/" + email)
  }

  existsInCart(email: string, id: number): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlCart + "/exists/" + id + "/" + email)
  }
}

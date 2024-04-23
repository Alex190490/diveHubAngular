import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../../Clases/WishList/wishlist';
import { environment } from '../../../environments/environment';
import { Activity } from '../../Clases/Activity/activity';
import { Item } from '../../Clases/Item/item';


@Injectable({
  providedIn: 'root'
})


export class WishlistService {

  constructor(private httpCliente : HttpClient) { }


  getListByUser(email: string): Observable<Wishlist[]> {
    return this.httpCliente.get<Wishlist[]>(environment.urlWish+"/"+email)
  }

  isProductOnWishList(id : number, email : string): Observable<boolean> {
    return this.httpCliente.get<boolean>(environment.urlWish+"/"+id+"/"+email)
  }

  isItemOrActivity(id : number): Observable<boolean>{
    return this.httpCliente.get<boolean>(environment.urlWish+"/findType/"+id)
  }

  addProduct(wishList : Wishlist): Observable<any> {
    return this.httpCliente.post<any>(environment.urlWish+"/add", wishList)
  }

  removeProduct(email : string, id : number): Observable<any> {
    return this.httpCliente.delete(environment.urlWish+"/clean/"+id+"/"+email)
  }

  removeAllProducts(email : string): Observable<any> {
    return this.httpCliente.delete(environment.urlWish+"/cleanAll/"+email)
  }
}

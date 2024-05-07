import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Item } from '../../Clases/Item/item';


@Injectable({
  providedIn: 'root'
})


export class ItemService {
  

  constructor(private httpCliente : HttpClient) { }


  getAllItems(): Observable<Item[]> {
    return this.httpCliente.get<Item[]>(environment.urlItem+"/all")
  }

  getItemById(id : number): Observable<Item> {
    return this.httpCliente.get<Item>(environment.urlItem+"/getItem/"+id)
  }

  getItemsByTag(tag: string): Observable<Item[]> {
    return this.httpCliente.get<Item[]>(environment.urlItem+"/tag/"+tag)
  }

  getItemsContainsInName(name : string): Observable<Item[]> {
    return this.httpCliente.get<Item[]>(environment.urlItem+"/name/"+name)
  }

  getItemsOrderByPrice(orderType : number): Observable<Item[]> {
    return this.httpCliente.get<Item[]>(environment.urlItem+"/price/"+orderType)
  }
  
  hasStock(id: number): Observable<boolean> {
    return this.httpCliente.get<boolean>(environment.urlItem+"/stock/"+id)
  }
}
 
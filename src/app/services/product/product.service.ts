import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../Clases/Product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpCliente : HttpClient) { }


  getAllProducts(): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(environment.urlProducts+"/all")
  }

  getProductById(id : number): Observable<Product> {
    return this.httpCliente.get<Product>(environment.urlProducts+"/getProductById/"+id)
  }

  getProductsByTag(tag : string): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(environment.urlProducts+"/tag/"+tag)
  }

  getProductsByCategory(category : number): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(environment.urlProducts+"/category/"+category)
  }

  getProductsByName(name : string): Observable<Product[]> {
    return this.httpCliente.get<Product[]>(environment.urlProducts+"/getProductByName/"+name)
  }

  getIsItem(id: number): Observable<Boolean> {
    return this.httpCliente.get<Boolean>(environment.urlProducts+"/isItem/" + id)
  }
}

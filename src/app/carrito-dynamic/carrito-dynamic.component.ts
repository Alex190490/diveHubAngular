import { Component } from '@angular/core'
import { Cart } from '../Clases/Cart/cart'
import { Product } from '../Clases/Product/product'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SessionStorageService } from '../services/sessionStorage/session-storage.service'
import { CartService } from '../services/cart/cart.service'
import { ProductService } from '../services/product/product.service'
import { forkJoin, map, switchMap } from 'rxjs'
import { Activity } from '../Clases/Activity/activity'
import { Item } from '../Clases/Item/item'


@Component({
  selector: 'app-carrito-dynamic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-dynamic.component.html',
  styleUrl: './carrito-dynamic.component.css'
})


export class CarritoDynamicComponent {
  myCart: Cart[]
  cartTotal: number



  constructor(
    private session: SessionStorageService,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}



  ngOnInit(): void {
    this.updateMyCart()
    this.totalCart()
  }


  updateMyCart() {
    this.cartService.getListByUser(this.session.getItem('email')).pipe(
      switchMap(data => {
        const requests = data.map(cartItem => this.productService.getProductById(cartItem.productId))
        return forkJoin(requests).pipe(
          map(products => {
            data.forEach((cartItem, index) => cartItem.product = products[index])
            return data
          })
        )
      })
    ).subscribe(myCart => this.myCart = myCart)
  }


  updateUnits(operation: string, amount: number, product: Product) {
    if (operation === 'minus' && amount > 0) amount--
    if (operation === 'add'  && amount < 5) amount++
    if (amount === 0) this.deleteProductFromCart(product.id)
    else {
      this.cartService.updateProductQuantity(this.session.getItem('email'), product.id, amount).subscribe(() => {
        this.updateMyCart()
        this.totalCart()
      })
    }
  }


  deleteProductFromCart(productId: number) {
    this.cartService.removeProduct(productId, this.session.getItem("email")).subscribe(() => {
      this.updateMyCart()
      this.totalCart()
    })
    window.location.reload()
  }


  deleteAllProductsFromCart() {
    this.cartService.removeAllProducts(this.session.getItem('email')).subscribe(() => {
      this.updateMyCart()
      this.totalCart()
    })
    window.location.reload()
  }
  

  isActivity(product: Product): boolean{
    switch(product.category){
      case "DIVE": case "COURSE": return true
    }
    return false
  }


  totalProduct(price: number, ammount: number) {
    return (price * ammount).toFixed(2)
  }


  totalCart() {
    this.cartService.calculateTotalCart(this.session.getItem('email')).subscribe(total=> this.cartTotal = parseFloat(total.toFixed(2)))
  }


  details() {
    this.router.navigate(['/carrito-details']).then(() => window.location.reload())
  }


  goShop() {
    this.router.navigate(['/shop']).then(() => window.location.reload())
  }
}

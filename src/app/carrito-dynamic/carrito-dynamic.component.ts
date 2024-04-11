import { Component } from '@angular/core'
import { Cart } from '../Clases/Cart/cart'
import { User } from '../Clases/user/user'
import { UserService } from '../services/user/user.service'
import { Product } from '../Clases/Product/product'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SessionStorageService } from '../services/sessionStorage/session-storage.service'


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
    private router: Router
  ) {}



  ngOnInit(): void {
    // this.updateMyCart()
    // this.totalCart()
  }


  updateMyCart(): void {
    // this.cartService.getListByUser(this.session.getItem('email')).subscribe(data => this.myCart = data)
  }


  updateUnits(operation: string, amount: number, product: Product): void {
    // if (operation === 'minus' && amount > 0) amount--
    // if (operation === 'add') amount++
    // if (amount === 0) this.deleteProductFromCart(product.id)
    // else {
    //   this.cartService.updateProductQuantity(this.session.getItem('email'), product.id, amount).subscribe(() => {
    //     this.updateMyCart()
    //     this.totalCart()
    //   })
    // }
  }

  deleteProductFromCart(productId: number): void {
    // this.cartService.removeProduct(productId).subscribe(() => {
    //   this.updateMyCart()
    //   this.totalCart()
    // })
    // window.location.reload()
  }


  deleteAllProductsFromCart(): void {
    // this.cartService.removeAllProducts(this.session.getItem('email')).subscribe(() => {
    //   this.updateMyCart()
    //   this.totalCart()
    // })
    // window.location.reload()
  }
  


  totalProduct(price: number, ammount: number) {
    // return (price * ammount).toFixed(2)
  }


  totalCart(): void {
    // this.cartService.getTotalPrice(this.session.getItem('email')).subscribe(total=> this.cartTotal = parseFloat(total.toFixed(2)))
  }


  details(): void {
    this.router.navigate(['/carrito-details'])
  }


  goShop(): void {
    this.router.navigate(['/shop'])
  }
}

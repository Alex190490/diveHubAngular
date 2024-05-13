import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { OrderService } from '../services/order/order.service';
import { User } from '../Clases/user/user';
import { Cart } from '../Clases/Cart/cart';
import { Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { OrderRequest } from '../Clases/Order/order-request';
import { CommonModule } from '@angular/common';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { ProductService } from '../services/product/product.service';
import { DetailsService } from '../services/detail/details.service';
import { DetailRequest } from '../Clases/Detail/detail-request';
import { Order } from '../Clases/Order/order';
import { FormsModule } from '@angular/forms';
import { Product } from '../Clases/Product/product';
import { ItemService } from '../services/item/item.service';


@Component({
  selector: 'app-carrito-details',
  standalone: true,
  imports: [RouterLink, CommonModule, MenuNavbarLoggeadoComponent, FormsModule],
  templateUrl: './carrito-details.component.html',
  styleUrl: './carrito-details.component.css'
})


export class CarritoDetailsComponent implements OnInit {
  myCart: Cart[]
  user: User = new User()
  cartTotalPrice: number
  isAbledToBuy: boolean = true



  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private session: SessionStorageService,
    private productService: ProductService,
    private detailService: DetailsService,
    private itemService: ItemService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.userService.getUser().subscribe(
      userData => {
        this.user = userData
        this.updateMyCart()
        this.totalCart()
        this.checkQuantityValidity()
      },
      error => console.error('Error al obtener información del usuario:', error)
    )
  }


  //Actualiza el carrito
  updateMyCart() {
    this.cartService.getListByUser(this.session.getItem('email')).subscribe(data => {
      this.myCart = data
      this.updateProductDetails()
      this.checkQuantityValidity()
    })
  }


  updateProductDetails() {
    this.myCart.forEach(cartItem => {
      this.productService.getProductById(cartItem.productId).subscribe(product => cartItem.product = product)
    })
  }


  //Devuelve el precio total del carrito
  totalCart() {
    this.cartService.calculateTotalCart(this.user.email).subscribe(total => this.cartTotalPrice = parseFloat(total.toFixed(2)))
  }


  //Devuelve el precio total del producto del carrito multiplicando su precio unitario con sus unidades
  totalProduct(price: number, ammount: number): string {
    return (price * ammount).toFixed(2)
  }


  // Método para verificar la validez de las cantidades seleccionadas
  checkQuantityValidity() {
    if (this.myCart) {
      this.isAbledToBuy = true
      this.myCart = this.myCart.filter(cart => cart !== undefined)

      this.myCart.forEach(cartItem =>
        this.productService.getIsItem(cartItem.productId).subscribe(isItem => {
          if (isItem) this.itemService.getItemById(cartItem.productId).subscribe(item => {
            cartItem.isOverStock = item.stock < cartItem.quantity
            if (cartItem.isOverStock) {
              this.isAbledToBuy = false
            }
          })
        })
      )
    }
  }


  isCartNull(): boolean {
    this.myCart = this.myCart.filter(item => item !== null || item !== undefined);
    return this.myCart.length === 0;
  }


  //Redirige a la página de pagos
  saveOrder() {
    if (this.isAbledToBuy) {
      const order: OrderRequest = {
        user: this.user,
        total: parseFloat(this.cartTotalPrice.toFixed(2)),
        date: new Date(),
        address: this.user.address
      }

      this.orderService.addOrder(order).subscribe((order: Order) => {
        this.myCart.forEach(cartItem => {
          const detail: DetailRequest = {
            order: order,
            productId: cartItem.productId,
            quantity: cartItem.quantity
          }
          this.detailService.postDetails(detail).subscribe()
        })
        this.cartService.removeAllProducts(this.session.getItem("email")).subscribe()
        this.router.navigate(['pay-method']).then(() => window.location.reload())
      })
    }
  }


  isActivity(product: Product): boolean {
    switch (product.category) {
      case "DIVE": case "COURSE": return true
    }
    return false
  }


  removeCartItem(cartItem: Cart) {
    this.cartService.removeProduct(cartItem.productId, this.session.getItem("email")).subscribe(() => window.location.reload())
  }


  updateCartItem(id: number, cartItem: any) {
    this.productService.getProductById(id).subscribe(product => {
      if (!this.isActivity(product)) this.cartService.updateProductQuantity(this.session.getItem("email"), id, cartItem.value).subscribe(() => window.location.reload())
      else window.location.reload()
    })
  }


  isLogged(): boolean {
    if (this.session.getItem('email') == null || this.session.getItem('email') == "" || this.session.getItem('email') == undefined) {
      this.router.navigate(["/home"]).then(() => window.location.reload())
      return false
    }
    return true
  }
}

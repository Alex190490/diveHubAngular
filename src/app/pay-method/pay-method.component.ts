import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user/user.service';
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
import { DetailsService } from '../services/detail/details.service';
import { ItemService } from '../services/item/item.service';
import { OrderRequest } from '../Clases/Order/order-request';
import { DetailRequest } from '../Clases/Detail/detail-request';
import { Order } from '../Clases/Order/order';
import { User } from '../Clases/user/user';
import { Cart } from '../Clases/Cart/cart';


@Component({
  selector: 'app-pay-method',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pay-method.component.html',
  styleUrl: './pay-method.component.css'
})


export class PayMethodComponent implements OnInit{
  user: User = new User()
  myCart: Cart[]
  cartTotalPrice: number


  constructor(
    private cartService: CartService,
    private session: SessionStorageService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private detailService: DetailsService,
    private route: ActivatedRoute
  ){}



  ngOnInit(): void {
    this.userService.getUser().subscribe(
      userData => {
        this.user = userData
        this.route.queryParams.subscribe(params => {
          this.myCart = JSON.parse(params['cart'])
          this.cartTotalPrice = params['totalPrice']
        })
      },
      error => console.error('Error al obtener información del usuario:', error)
    )
  }


  saveOrder(){
    console.log(this.cartTotalPrice)
    const order: OrderRequest = {
      user: this.user,
      total: this.cartTotalPrice,
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
    })


    Swal.fire({
      text: 'Compra realizada correctamente',
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir a mis pedidos',
      cancelButtonText: 'Volver a inicio',
      customClass: {
        confirmButton: 'm-2 btn btn-success',
        cancelButton: 'm-2 btn btn-primary',
      },
      buttonsStyling: false,
    }).then(
      result => {
        if (result.isConfirmed) {
          this.cartService.removeAllProducts(this.session.getItem("email")).subscribe()
          this.router.navigate(['/my-orders'])
        }
        else {
          this.cartService.removeAllProducts(this.session.getItem("email")).subscribe()
          this.router.navigate(['/home'])
        }
      }
    )
  }
}

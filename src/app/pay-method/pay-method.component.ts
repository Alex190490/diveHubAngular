import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pay-method',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pay-method.component.html',
  styleUrl: './pay-method.component.css'
})


export class PayMethodComponent {

  constructor(
    private cartService: CartService,
    private session: SessionStorageService,
    private router: Router
  ){}



  saveOrder(){
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

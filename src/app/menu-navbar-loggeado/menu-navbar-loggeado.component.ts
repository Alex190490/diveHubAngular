import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';
import { User } from '../Clases/user/user';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';
import { NavbarCollapseComponent } from '../navbar-collapse/navbar-collapse.component';
import { CartService } from '../services/cart/cart.service';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent, NavbarCollapseComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent implements OnInit{
  productsInCart: number
  isAdmin: boolean
  user: User = new User()



  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private session: SessionStorageService,
    private cartService: CartService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.userService.getUser().subscribe(
      user => {
        this.user = user
        this.fetchCartInfo()
        this.checkIsAdmin()
      },
      error => {
        this.loginService.logout()
        this.router.navigate(['/home']).then(() => window.location.reload())
      }
    )
  }


  fetchCartInfo() {
    this.cartService.countByClient(this.session.getItem('email')).subscribe(count => this.productsInCart = count)
  }


  logOut() {
    Swal.fire({
      text: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, gracias',
      customClass: {
        confirmButton: 'm-2 btn btn-success',
        cancelButton: 'm-2 btn btn-danger',
      },
      buttonsStyling: false,
    }).then(
      result => {
        if (result.isConfirmed) {
          this.loginService.logout()
          this.router.navigate(['/home']).then(() => window.location.reload())
        }
      }
    )
  }


  checkIsAdmin(){
    this.userService.isAdmin().subscribe(isAdmin=>this.isAdmin=isAdmin)
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';
import { User } from '../Clases/user/user';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent implements OnInit{
  nombre: String
  productsInCart: number = 10
  user: User = new User()
  isCollapseActive: boolean = false



  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user=user
      this.fetchCartInfo()
    })
  }


  fetchCartInfo() {
    // this.cartService.countByClient(this.user.email).subscribe(count => {
    //   this.productsInCart = count
    // })
  }


  // Método para cambiar el estado del collapse
  toggleCollapse(): void {
    this.isCollapseActive = !this.isCollapseActive;
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
          this.router.navigate(['/home'])
        }
      }
    )
  }
}

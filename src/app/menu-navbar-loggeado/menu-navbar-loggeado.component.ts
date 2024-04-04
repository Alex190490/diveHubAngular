import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';
import { LoginService } from '../services/auth/login.service';
import { User } from '../Clases/user/user';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent implements OnInit {
  nombre: String
  productsInCart: number
  user: User = new User()



  constructor(
    private loginService: LoginService,
    private userService: UserService,
  ){
    this.productsInCart=3
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe(
      userData => {
        this.user = userData
      }
    )
  }


  logOut() {
    this.loginService.logout()
  }
}

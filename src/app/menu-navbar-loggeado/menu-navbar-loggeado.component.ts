import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';
import { User } from '../Clases/user/user';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent {
  nombre: String
  productsInCart: number
  user: User = new User()



  constructor(
  ){
    this.productsInCart=3
  }



  logOut() {
  }
}

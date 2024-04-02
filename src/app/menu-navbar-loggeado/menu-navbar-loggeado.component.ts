import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent {
  nombre: String
  viewCart: boolean = false
  productsInCart: number



  constructor(){
    this.nombre="Mi nombre"
    this.productsInCart=10
  }



  showCart() {
    this.viewCart = !this.viewCart
  }

  
  logOut() {
  }
}

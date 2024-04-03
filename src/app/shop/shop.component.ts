import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})


export class ShopComponent {
  constructor(){}


  isLogged(): boolean{
    return true
  }
}

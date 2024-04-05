import { Component } from '@angular/core';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  constructor(){}


  isLogged(): boolean{
    return false
  }
}

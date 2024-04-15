import { Component } from '@angular/core';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, CommonModule, RouterLink],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css'
})


export class GaleryComponent {

  constructor(
    private session: SessionStorageService
  ){}


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }
}

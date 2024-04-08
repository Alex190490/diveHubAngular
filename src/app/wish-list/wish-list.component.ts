import { Component } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})


export class WishListComponent {

  constructor(
  ){}



}

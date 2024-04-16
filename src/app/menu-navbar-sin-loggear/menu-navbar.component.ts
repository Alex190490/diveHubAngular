import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-menu-navbar-sin-loggear',
  standalone: true,
  imports: [RouterLink, CommonModule, LoginComponent],
  templateUrl: './menu-navbar.component.html',
  styleUrl: './menu-navbar.component.css'
})


export class MenuNavbarSinLoggearComponent {
  isCollapseActive: boolean = false


  // Método para cambiar el estado del collapse
  toggleCollapse(): void {
    this.isCollapseActive = !this.isCollapseActive;
  }

}

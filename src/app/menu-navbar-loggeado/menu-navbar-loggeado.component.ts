import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoDynamicComponent } from '../carrito-dynamic/carrito-dynamic.component';
import { User } from '../Clases/user/user';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-menu-navbar-loggeado',
  standalone: true,
  imports: [RouterLink, CommonModule, CarritoDynamicComponent],
  templateUrl: './menu-navbar-loggeado.component.html',
  styleUrl: './menu-navbar-loggeado.component.css'
})


export class MenuNavbarLoggeadoComponent implements OnInit{
  nombre: String
  productsInCart: number
  user: User = new User()



  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ){
    this.productsInCart=3
  }



  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user=user)
  }

  logOut() {
    this.loginService.logout()
    this.router.navigate(['/home'])
  }
}

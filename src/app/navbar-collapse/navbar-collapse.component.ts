import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { User } from '../Clases/user/user';
import Swal from 'sweetalert2';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
import { CartService } from '../services/cart/cart.service';


@Component({
  selector: 'app-navbar-collapse',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-collapse.component.html',
  styleUrl: './navbar-collapse.component.css'
})


export class NavbarCollapseComponent {
  productsInCart: number
  user: User = new User()
  isAdmin: boolean
  


  constructor(
    private session: SessionStorageService,
    private loginService: LoginService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user=user
      if(this.isLogged()) {
        this.fetchCartInfo()
        this.checkIsAdmin()
      }
    })
  }  


  fetchCartInfo() {
    this.cartService.countByClient(this.session.getItem('email')).subscribe(count => this.productsInCart = count)
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
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
          this.router.navigate(['/home']).then(() => window.location.reload())
        }
      }
    )
  }


  checkIsAdmin(){
    this.userService.isAdmin().subscribe(isAdmin=>this.isAdmin=isAdmin)
  }
}

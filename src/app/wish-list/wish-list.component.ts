import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { CommonModule } from '@angular/common';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { WishlistService } from '../services/wishList/wishlist.service';
import { Item } from '../Clases/Item/item';
import { Wishlist } from '../Clases/WishList/wishlist';
import { Activity } from '../Clases/Activity/activity';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, RouterLink, FooterComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})


export class WishListComponent implements OnInit{
  listToShow: Wishlist[] = new Array()



  constructor(
    private wishListService: WishlistService,
    private session: SessionStorageService
  ){}


 
  ngOnInit(): void {
    this.getFavourites()
  }


  getFavourites(){
    this.wishListService.getListByUser(this.session.getItem("email")).subscribe(wishList=> this.listToShow=wishList)
  }


  toggleLike(product: (Item | Activity)) {
    this.wishListService.removeProduct(this.session.getItem("email"), product.id).subscribe(removed=> this.getFavourites())
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { Item } from '../Clases/Item/item';
import { ActivityService } from '../services/activity/activity.service';
import { Activity } from '../Clases/Activity/activity';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { WishlistService } from '../services/wishList/wishlist.service';
import { Wishlist } from '../Clases/WishList/wishlist';
import { UserService } from '../services/user/user.service';
import { User } from '../Clases/user/user';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, RouterLink, FooterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})


export class ShopComponent implements OnInit {
  selectedOption: number
  listItems: Item[] = new Array()
  listActivities: Activity[] = new Array()
  listDives: Activity[] = new Array()
  listCourses: Activity[] = new Array()
  listToShow: (Activity | Item)[] = new Array()
  user: User = new User()


  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private userService: UserService,
    private session: SessionStorageService,
    private wishlistService: WishlistService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.selectedOption = 0

    this.getAllItems()
    this.getAllActivities()
    this.getActivitiesByCategory(0).subscribe(dives => {
      this.listDives = dives
      this.showList()
    })
    this.getActivitiesByCategory(1).subscribe(courses => {
      this.listCourses = courses
      this.showList()
    })    
  }


  showList(){
    const sortedList = [...this.listItems, ...this.listActivities]
    this.listToShow = sortedList.sort((a, b) => a.id - b.id)
    this.isOnWishList()
  }


  getAllItems(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.listItems = items
      this.isOnWishList()
      this.showList()
    })
  }


  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe(activities => {
      this.listActivities = activities
      this.showList()
    })
  }


  getActivitiesByCategory(category: number): Observable<Activity[]> {
    return this.activityService.getActivitiesByCategory(category)
  }


  orderProducts(type: string) {
    switch (type) {
      case "ALL":
        this.selectedOption = 0
        const sortedList = [...this.listItems, ...this.listActivities]
        this.listToShow = sortedList.sort((a, b) => a.id - b.id)
        this.isOnWishList()
        break
      case "DIVES":
        this.selectedOption = 1
        this.listToShow = this.listDives
        this.isOnWishList()
        break
      case "COURSES":
        this.selectedOption = 2
        this.listToShow = this.listCourses
        this.isOnWishList()
        break
      case "ITEMS":
        this.selectedOption = 3
        this.listToShow = this.listItems
        this.isOnWishList()
        break
    }
  }

  orderProductsSelect(type: any) {
    switch (type.value) {
      case "ALL":
        this.selectedOption = 0
        const sortedList = [...this.listItems, ...this.listActivities]
        this.listToShow = sortedList.sort((a, b) => a.id - b.id)
        this.isOnWishList()
        break
      case "DIVES":
        this.selectedOption = 1
        this.listToShow = this.listDives
        this.isOnWishList()
        break
      case "COURSES":
        this.selectedOption = 2
        this.listToShow = this.listCourses
        this.isOnWishList()
        break
      case "ITEMS":
        this.selectedOption = 3
        this.listToShow = this.listItems
        this.isOnWishList()
        break
    }
  }


  isOnWishList() {
    if(this.isLogged()){
      this.listToShow.forEach(product => {
        this.wishlistService.isProductOnWishList(product.id, this.session.getItem("email")).subscribe(
          isProductLiked => product.isLiked=isProductLiked
        )
      })
    }
  }


  toggleLike(product: any) {
    this.userService.getUser().subscribe(user => {
      this.user = user

        this.wishlistService.isProductOnWishList(product.id, this.session.getItem("email")).subscribe(isProductLiked => {
          this.wishlistService.isItemOrActivity(product.id).subscribe(isItem=>{

            if (!isProductLiked) {
              const wishList: Wishlist = {
                user: this.user, 
                item: isItem ? product : null, 
                activity: isItem ? null : product
              }

              this.wishlistService.addProduct(wishList).subscribe(newProduct => {
                product.isLiked=true
              })
            } else {
              this.wishlistService.removeProduct(this.session.getItem("email"), product.id).subscribe(newProduct => {
                product.isLiked=false
              })
            }
          })
        })
    })
  }
  

  navigateToProduct(productId: number) {
    this.router.navigate(['/product-details/', productId]).then(() => window.location.reload())
  }
  

  isLogged(): boolean {
    if (this.session.getItem('email') == null || this.session.getItem('email') == "" || this.session.getItem('email') == undefined) return false
    return true
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { Item } from '../Clases/Item/item';
import { ActivityService } from '../services/activity/activity.service';
import { Activity } from '../Clases/Activity/activity';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})


export class ShopComponent implements OnInit {
  selectedOption: number
  listItems: Item[] = new Array()
  listActivities: Activity[] = new Array()
  listDives: Activity[] = new Array()
  listCourses: Activity[] = new Array()
  listProducts: (Item | Activity)[] = new Array()
  listToShow: (Activity | Item)[] = new Array()



  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.selectedOption = 0

    this.itemService.getAllItems().subscribe(
      items => {
        this.listItems = items
        this.listProducts.push(...this.listItems)
        this.listToShow = this.listProducts
      }
    )

    this.activityService.getAllActivities().subscribe(
      activities => {
        this.listActivities = activities
        this.listProducts.push(...this.listActivities)
        this.listToShow = this.listProducts
      }
    )

    this.activityService.getActivitiesByCategory(0).subscribe(
      dives => this.listDives = dives
    )

    this.activityService.getActivitiesByCategory(1).subscribe(
      courses => this.listCourses = courses
    )
  }

  
  orderProducts(type: string) {
    switch (type) {
      case "ALL": 
        this.selectedOption = 0
        this.listToShow = this.listProducts
        break
      case "DIVES": 
        this.selectedOption = 1
        this.listToShow = this.listDives
        break
      case "COURSES": 
        this.selectedOption = 2
        this.listToShow = this.listCourses
        break
      case "ITEMS": 
        this.selectedOption = 3
        this.listToShow = this.listItems
        break
    }
  }


  checkLogin(){
    if(this.isLogged()) this.router.navigate(['/home'])
  }


  isLogged(): boolean{
    if(sessionStorage.getItem('token')!=null||sessionStorage.getItem('token')!=undefined) return true
    return false
  }
}

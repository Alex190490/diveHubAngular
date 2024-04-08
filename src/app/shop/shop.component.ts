import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { Item } from '../Clases/Item/item';
import { ActivityService } from '../services/activity/activity.service';
import { Activity } from '../Clases/Activity/activity';
import { ProductService } from '../services/product/product.service';
import { Product } from '../Clases/Product/product';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';


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
  listProducts: Product[] = new Array()
  listToShow: any = new Array()



  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private productService: ProductService,
    private session: SessionStorageService
  ) { }



  ngOnInit(): void {
    this.selectedOption = 0

    this.getAllProducts()
    this.getAllItems()
    this.getAllActivities()
    this.getActivitiesByCategory(0).subscribe(dives => this.listDives = dives)
    this.getActivitiesByCategory(1).subscribe(courses => this.listCourses = courses)
  }


  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.listProducts = products
      this.listToShow = this.listProducts
    })
  }


  getAllItems(): void {
    this.itemService.getAllItems().subscribe(items => this.listItems = items)
  }


  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe(activities => this.listActivities = activities)
  }

  
  getActivitiesByCategory(category: number): Observable<Activity[]> {
    return this.activityService.getActivitiesByCategory(category)
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


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }
}

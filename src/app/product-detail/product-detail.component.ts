import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { ActivityService } from '../services/activity/activity.service';
import { Activity } from '../Clases/Activity/activity';
import { Item } from '../Clases/Item/item';
import { Product } from '../Clases/Product/product';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})


export class ProductDetailComponent implements OnInit{
  id: number
  isItem: boolean = true
  product: Product = new Product()
  item: Item = new Item()
  activity: Activity = new Activity()



  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private productService: ProductService,
    private router: Router,
    private path: ActivatedRoute
  ) {}



  ngOnInit(): void {
    this.id = this.path.snapshot.params['id']

    this.productService.getProductById(this.id).subscribe(product => {
      this.product = product
      switch(this.product.category){
        case "DIVE": case "COURSE":
          this.activityService.getActivityById(this.id).subscribe(activity=>this.activity=activity)
          this.isItem = false
          break
        case "PRODUCT":
          this.itemService.getItemById(this.id).subscribe(item=>this.item=item)
          this.isItem = true
          break
      }
    })
  }


  addToCart(){

  }


  isLogged(): boolean{
    return true
  }
}

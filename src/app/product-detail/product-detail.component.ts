import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { ActivityService } from '../services/activity/activity.service';
import { Activity } from '../Clases/Activity/activity';
import { Item } from '../Clases/Item/item';
import { Product } from '../Clases/Product/product';
import { ProductService } from '../services/product/product.service';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { CartRequest } from '../Clases/Cart/cart-request';
import { UserService } from '../services/user/user.service';
import { CartService } from '../services/cart/cart.service';
import { AssessmentService } from '../services/assessment/assessment.service';
import { Assessment } from '../Clases/Assessment/assessment';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, RouterLink, FooterComponent, LoginComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})


export class ProductDetailComponent implements OnInit {
  id: number
  isItem: boolean = true
  product: Product = new Product()
  item: Item = new Item()
  activity: Activity = new Activity()
  quantity: number = 1
  assessments: Assessment[] = new Array()
  totalAssessmts: number
  media: number

  @ViewChild('valoracionesDiv') valoracionesDivs: ElementRef;
  scrollToDiv() {
    this.valoracionesDivs.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private productService: ProductService,
    private path: ActivatedRoute,
    private session: SessionStorageService,
    private userService: UserService,
    private cartService: CartService,
    private assessmentsService: AssessmentService
  ) { }



  ngOnInit(): void {
    this.id = this.path.snapshot.params['id']

    this.productService.getProductById(this.id).subscribe(product => {
      this.product = product
      switch (this.product.category) {
        case "DIVE": case "COURSE":
          this.activityService.getActivityById(this.id).subscribe(activity => this.activity = activity)
          this.isItem = false
          break
        case "PRODUCT":
          this.itemService.getItemById(this.id).subscribe(item => this.item = item)
          this.isItem = true
          break
      }

      this.assessmentsService.getAssessmentsByProduct(this.id).subscribe(assessments => {
        this.assessments = assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        this.totalAssessments()
      })
    })
  }


  addToCart(product: (Item | Activity)){
    if (this.isLogged()) {
      this.userService.getUser().subscribe(user => {

        const cartItem: CartRequest = {
          user: user,
          productId: product.id,
          quantity: this.quantity
        }

        this.cartService.addProduct(cartItem).subscribe(() => window.location.reload())
      })
    }
  }


  setQuantity(quantity: any){
    this.quantity = quantity.value
  }


  totalAssessments(){
    this.assessmentsService.getTotalByProduct(this.id).subscribe(total => this.totalAssessmts = total)
  }


  parseDate(date: Date): string {
    return new Date(date).toLocaleDateString()
  }


  getMedia(): number{
    let total = 0
    this.assessments.forEach(assess => {
      total += assess.stars
    });

    this.media = parseFloat((total / this.assessments.length).toFixed(1))

    return total / this.assessments.length
  }


  switchMode(type: any){
    switch(type.value){
      case "old": this.assessments = this.assessments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); break
      case "new": this.assessments = this.assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break
      case "best":  this.assessments = this.assessments.sort((a, b) => b.stars - a.stars); break
      case "worst": this.assessments = this.assessments.sort((a, b) => a.stars - b.stars); break
    }
  }


  isLogged(): boolean{
    if (this.session.getItem('email') == null || this.session.getItem('email') == "" || this.session.getItem('email') == undefined) return false
    return true
  }
}

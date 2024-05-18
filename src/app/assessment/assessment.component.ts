import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item/item.service';
import { ActivityService } from '../services/activity/activity.service';
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { UserService } from '../services/user/user.service';
import { CartService } from '../services/cart/cart.service';
import { Activity } from '../Clases/Activity/activity';
import { Product } from '../Clases/Product/product';
import { Item } from '../Clases/Item/item';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { CommonModule } from '@angular/common';
import { User } from '../Clases/user/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AssessmentService } from '../services/assessment/assessment.service';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, CommonModule, ReactiveFormsModule, RouterLink, FooterComponent],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})


export class AssessmentComponent implements OnInit{
  id: number
  user: User = new User()
  isItem: boolean = true
  product: Product = new Product()
  item: Item = new Item()
  activity: Activity = new Activity()
  starsToPut: number

  assessmentForm = this.formBuilder.group({
    content: [''],
  })



  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private productService: ProductService,
    private path: ActivatedRoute,
    private router: Router,
    private session: SessionStorageService,
    private userService: UserService,
    private assessmentService: AssessmentService,
    private formBuilder: FormBuilder
  ) {}



  ngOnInit(): void {
    this.isLogged()
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

    this.userService.getUser().subscribe(
      userData => {
        this.user = userData
      },
      error => console.error('Error al obtener información del usuario:', error)
    )
  }


  rateProduct(rating: number) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) star.classList.add('active') 
        else star.classList.remove('active')  
    })

    this.starsToPut = document.querySelectorAll('.active').length
  } 


  get content() {
    return this.assessmentForm.controls.content;
  }


  saveAssessment(){
    const assessmentRequest = {
      user: this.user,
      content: this.content.value || "",
      stars: this.starsToPut,
      date: new Date(),
      productId: this.id
    }
    this.assessmentService.addAssessment(assessmentRequest).subscribe(()=>this.router.navigate(['/product-details', this.id]))
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) {
      this.router.navigate(['/home']).then(()=>window.location.reload())
      return false
    }
    return true
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { UserService } from '../services/user/user.service';
import { Product } from '../Clases/Product/product';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { CommonModule } from '@angular/common';
import { User } from '../Clases/user/user';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentService } from '../services/assessment/assessment.service';
import { Assessment } from '../Clases/Assessment/assessment';
import { forkJoin, map, switchMap } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-my-assessments',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, CommonModule, ReactiveFormsModule, RouterLink, FooterComponent],
  templateUrl: './my-assessments.component.html',
  styleUrl: './my-assessments.component.css'
})


export class MyAssessmentsComponent implements OnInit {
  user: User = new User()
  products: Product[] = new Array()
  assments: Assessment[] = new Array()


  constructor(
    private productService: ProductService,
    private router: Router,
    private session: SessionStorageService,
    private userService: UserService,
    private assessmentService: AssessmentService,
  ) { }



  ngOnInit(): void {
    this.isLogged()

    this.userService.getUser().subscribe(
      userData => {
        this.user = userData
        this.assessmentService.getAssessmentsByUser(this.session.getItem("email")).pipe(
          switchMap(data => {
            const requests = data.map(assessItem => this.productService.getProductById(assessItem.productId))
            return forkJoin(requests).pipe(
              map(products => {
                data.forEach((assessItem, index) => assessItem.product = products[index])
                return data
              })
            )
          })
        ).subscribe(myAssments => {
          this.assments = myAssments
          console.log(this.assments)
        })
      },
      error => console.error('Error al obtener información del usuario:', error)
    )
  }


  isAssmentNull(): boolean {
    this.assments = this.assments.filter(assment => assment !== null || assment !== undefined)
    return this.assments.length === 0
  }


  getProductsContainingAssessments() {
    return this.assments.filter(assessment => assessment.product.id && assessment.stars > 0)
      .map(assessment => assessment.product)
      .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
  }


  getAssessmentsForProduct(productId: number) {
    return this.assments.filter(assessment => assessment.product.id === productId)
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}



  parseDate(date: Date): string {
    return new Date(date).toLocaleString()
  }


  isLogged(): boolean {
    if (this.session.getItem('email') == null || this.session.getItem('email') == "" || this.session.getItem('email') == undefined) {
      this.router.navigate(['/home']).then(() => window.location.reload())
      return false
    }
    return true
  }
}


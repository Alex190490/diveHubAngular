import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../Clases/user/user';
import { UserService } from '../services/user/user.service';
import { differenceInSeconds } from 'date-fns';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { DetailsService } from '../services/detail/details.service';
import { Detail } from '../Clases/Detail/detail';
import { forkJoin, map, switchMap } from 'rxjs';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-admin-area',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.css'
})


export class AdminAreaComponent {
  userLogged: string = this.session.getItem("email")
  listUsers: User[] = new Array()
  details: Detail[] = new Array()
  segundosTimer: any
  showOrderDetails: boolean = false



  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private session: SessionStorageService,
    private detailService: DetailsService,
    private productService: ProductService
  ) { }



  ngOnInit(): void {
    this.userService.isAdmin().subscribe(
      isAdmin => { if (!isAdmin) this.router.navigate(['/home']).then(() => window.location.reload()) },
      () => this.router.navigate(['/home']).then(() => window.location.reload())
    )

    this.userService.getAllUsers().subscribe(users => this.listUsers = users)
  }


  parseDate(date: string | Date): string {
    return new Date(date).toLocaleDateString()
  }


  deleteUser(email: string){
    this.showOrderDetails = false
    this.userService.deleteUser(email).subscribe(() => this.userService.getAllUsers().subscribe(users => this.listUsers = users))
  }


  getOrder(email: string){
    this.details = new Array()
    this.showOrderDetails = !this.showOrderDetails
    this.detailService.getDetailsByUser(email).pipe(
      switchMap(details => {
        const requests = details.map(detailsItem => this.productService.getProductById(detailsItem.productId))
        return forkJoin(requests).pipe(
          map(products => {
            details.forEach((detailsItem, index) => detailsItem.product = products[index])
            return details
          })
        )
      })
    ).subscribe(myDetails => this.details = myDetails)
  }


  groupByOrderId(details: Detail[]): Detail[][] {
    const groupedDetails: { [orderId: number]: Detail[] } = {}
  
    details.forEach(detail => {
      if (!groupedDetails[detail.order.id]) groupedDetails[detail.order.id] = []
      groupedDetails[detail.order.id].push(detail)
    })
    
    return Object.values(groupedDetails).sort((a, b) => {
      return new Date(b[0].order.date).getTime() - new Date(a[0].order.date).getTime()
    })
  }


  saveUser(user: User){
    this.userService.updateUser(user, user.email).subscribe()
  }
}

import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Detail } from '../Clases/Detail/detail';
import { DetailsService } from '../services/detail/details.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, MenuNavbarLoggeadoComponent, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})


export class MyOrdersComponent implements OnInit{
  details: Detail[] = new Array()


  constructor(
    private session: SessionStorageService,
    private router: Router,
    private productService: ProductService,
    private detailService: DetailsService
  ){}



  ngOnInit(): void {
    this.isLogged()
    this.getDetailsByUser()
  }


  getDetailsByUser(){
    this.detailService.getDetailsByUser(this.session.getItem("email")).pipe(
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


  parseDate(date: Date): string{
    return new Date(date).toLocaleString()
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) {
      this.router.navigate(['/home']).then(()=>window.location.reload())
      return false
    }
    return true
  }
}

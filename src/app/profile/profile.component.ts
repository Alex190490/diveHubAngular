import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { Router, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { User } from '../Clases/user/user';
import { UserService } from '../services/user/user.service';
import { ActivityService } from '../services/activity/activity.service';
import { ProductService } from '../services/product/product.service';
import { Activity } from '../Clases/Activity/activity';
import { OrderService } from '../services/order/order.service';
import { DetailsService } from '../services/detail/details.service';
import { CommonModule } from '@angular/common';
import { differenceInSeconds } from 'date-fns';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequestUpdate } from '../Clases/user/user-request-update';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, MenuNavbarLoggeadoComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {
  user: User = new User()
  activitiesAvailables: Activity[] = new Array
  segundosTimer: any
  editable: boolean = false 

  userForm = this.formBuilder.group({
    nickname: ['', Validators.required],
    name: ['', Validators.required],
    surnames: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [0, Validators.required],
    birthday: [new Date(), Validators.required],
    address: ['', Validators.required],
    level: ['', Validators.required]
  })
  


  constructor(
    private router: Router,
    private session: SessionStorageService,
    private userService: UserService,
    private orderService: OrderService,
    private activityService: ActivityService,
    private detailService: DetailsService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    this.isLogged()
    this.userForm.disable()

    this.userService.getUser().subscribe(user => {
      this.user = user;

      this.orderService.getOrdersByUser(this.user.email).subscribe(orders => {
        orders.forEach(order => {
          this.detailService.getDetailsByOrder(order.id).subscribe(details => {
            details.forEach(detail => {
              this.productService.getProductById(detail.productId).subscribe(product => {
                if(product.category!="PRODUCT"){
                  this.activityService.getActivityById(detail.productId).subscribe(activity => {
                    this.activitiesAvailables.push(activity)
                    this.activitiesAvailables = this.activitiesAvailables.sort((a, b) => new Date(a.time_ends).getTime() - new Date(b.time_ends).getTime())
                  })
                }
              })
            })
          })
        })
      })
    })

    this.segundosTimer = setInterval(() => {
      this.parseToFinish()
    }, 1000)
  }


  parseToFinish(): void {
    this.activitiesAvailables.forEach(activity => activity.time_ends_parsed = this.parseToExactTime(activity.time_ends))
  }


  private parseToExactTime(fechaSinFormatear: Date): string {
    const fecha = new Date(fechaSinFormatear)
    const ahora = new Date()

    const diferencia = differenceInSeconds(fecha, ahora)

    const d = Math.floor(diferencia / 86400)
    const h = Math.floor((diferencia % 86400) / 3600)
    const m = Math.floor((diferencia % 3600) / 60)
    const s = diferencia % 60

    if (d == 0 && h == 0 && m == 0) return s + " s"
    else if (d == 0 && h == 0) return m + " min " + s + " s"
    else if (d == 0) return h + " horas " + m + " min "
    else return d + " días"
  }


  parseToExactTimeString(fechaSinFormatear: string): string {
    const fecha = new Date(fechaSinFormatear)
    const ahora = new Date()

    const diferencia = differenceInSeconds(ahora, fecha)

    const d = Math.floor(diferencia / 86400)
    const h = Math.floor((diferencia % 86400) / 3600)
    const m = Math.floor((diferencia % 3600) / 60)
    const s = diferencia % 60

    if (d == 0 && h == 0 && m == 0) return s + "s"
    else if (d == 0 && h == 0) return m + "min " + s + "s"
    else if (d == 0) return h + "h " + m + "min " + s + "s"
    else return d + "d " + h + "h " + m + "min " + s + "s"
  }


  parseToBirthday(dateToFormat: Date): any{
    if (!dateToFormat) return null

    const date = new Date(dateToFormat)
    
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${year}-${month}-${day}`
  }


  switchMode(type: any){
    switch(type.value){
      case "new": this.activitiesAvailables = this.activitiesAvailables.sort((a, b) => new Date(a.time_ends).getTime() - new Date(b.time_ends).getTime()); break
      case "old": this.activitiesAvailables = this.activitiesAvailables.sort((a, b) => new Date(b.time_ends).getTime() - new Date(a.time_ends).getTime()); break
    }
  }


  saveUser(){
    this.editable = !this.editable
    this.userForm.enable()

    if(!this.editable){
      const userFormToSave = {
        nickname: this.nickname.value,
        name: this.name.value,
        surnames: this.surnames.value,
        email: this.email.value,
        phone: this.phone.value,
        birthday: this.parseToBirthday2(this.birthday.value),
        address: this.address.value,
        level: this.level.value
      }

      this.userService.updateUser(userFormToSave as UserRequestUpdate, this.session.getItem("email")).subscribe()
      this.userForm.disable()
    } else {
      this.userForm.enable()
    }
  }


  parseToBirthday2(dateToFormat: any): any {
    if (!dateToFormat) return null
  
    const date = new Date(dateToFormat)
  
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
  
    return `${year}-${month}-${day}T00:00:00`
  }


  isLogged(): boolean {
    if (this.session.getItem('email') == null || this.session.getItem('email') == "" || this.session.getItem('email') == undefined) {
      this.router.navigate(['/home']).then(() => window.location.reload())
      return false
    }
    return true
  }



  get nickname() {
    return this.userForm.controls.nickname;
  }

  get name() {
    return this.userForm.controls.name;
  }

  get surnames() {
    return this.userForm.controls.surnames;
  }

  get email() {
    return this.userForm.controls.email;
  }

  get phone() {
    return this.userForm.controls.phone;
  }

  get birthday() {
    return this.userForm.controls.birthday;
  }

  get address() {
    return this.userForm.controls.address;
  }

  get level() {
    return this.userForm.controls.level;
  }
}

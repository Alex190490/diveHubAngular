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


export class AdminAreaComponent implements OnInit, OnDestroy {
  userLogged: string = this.session.getItem("email")
  listUsers: User[] = new Array()
  details: Detail[] = new Array()
  visible: string = 'password'
  segundosTimer: any
  showForm: boolean = false
  submitted: boolean = false
  hideOrderDetails: boolean = true

  nuevoUsuarioForm = this.formBuilder.group({
    nickname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}')]],
    clave: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    dir: ['', Validators.required],
    tlf: ['', Validators.required],
    f_nac: ['', Validators.required],
    nivel: ['', Validators.required],
    rol: ['', Validators.required]
  })



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
      isAdmin => { if (!isAdmin) this.router.navigate(['/home']) },
      () => { this.router.navigate(['/home']) }
    )

    this.userService.getAllUsers().subscribe(users => {
      this.listUsers = users

      this.segundosTimer = setInterval(() => {
        this.actualizarSegundos()
      }, 100)
    })
  }


  ngOnDestroy(): void {
    clearInterval(this.segundosTimer)
  }


  actualizarSegundos(): void {
    this.listUsers.forEach(user => user.last_login_parsed = this.parseToExactTime(user.last_login))
  }


  parseToString(fechaSinFormatear: string): string {
    if (fechaSinFormatear !== null) return fechaSinFormatear.split('T')[0]
    return fechaSinFormatear
  }


  parseToExactTime(fechaSinFormatear: string): string {
    const fecha = new Date(fechaSinFormatear)
    const ahora = new Date()

    const diferencia = differenceInSeconds(ahora, fecha)

    const d = Math.floor(diferencia / 86400)
    const h = Math.floor((diferencia % 86400) / 3600)
    const m = Math.floor((diferencia % 3600) / 60)
    const s = diferencia % 60

    if (d == 0 && h == 0 && m == 0) return "hace " + s + "s"
    else if (d == 0 && h == 0) return "hace " + m + "min " + s + "s"
    else if (d == 0) return "hace " + h + "h " + m + "min " + s + "s"
    else return "hace " + d + "d " + h + "h " + m + "min " + s + "s"

  }


  deleteUser(email: string){
    this.hideOrderDetails = false
    this.userService.deleteUser(email).subscribe(() => this.userService.getAllUsers().subscribe(users => this.listUsers = users))
  }


  getOrder(email: string){
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
    ).subscribe(myDetails => {
      this.details = myDetails
      this.hideOrderDetails = !this.hideOrderDetails
    })
  }


  groupByOrderId(details: Detail[]): Detail[][] {
    const groupedDetails: { [orderId: number]: Detail[] } = {}
  
    details.forEach(detail => {
      if (!groupedDetails[detail.order.id]) groupedDetails[detail.order.id] = []
      groupedDetails[detail.order.id].push(detail)
    })
  
    return Object.values(groupedDetails)
  }
  
  






  togglePasswordVisibility() {
    this.visible = this.visible === 'password' ? 'text' : 'password'
  }


  toggleForm(): void {
    this.showForm = !this.showForm
  }


  get f() { 
    return this.nuevoUsuarioForm.controls 
  }

  onSubmit() {
    this.submitted=true
    if (this.nuevoUsuarioForm.invalid) {
      console.log('Formulario inválido:', this.nuevoUsuarioForm.value)
      return
    }
    console.log('Formulario válido, enviar datos:', this.nuevoUsuarioForm.value)
  }
}

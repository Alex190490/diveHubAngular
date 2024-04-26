import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../Clases/user/user';
import { UserService } from '../services/user/user.service';
import { differenceInSeconds } from 'date-fns';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';


@Component({
  selector: 'app-admin-area',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.css'
})


export class AdminAreaComponent implements OnInit, OnDestroy {
  userLogged: string = this.session.getItem("email")
  listUsers: User[] = new Array()
  visible: string = 'password';
  segundosTimer: any
  showForm: boolean = false
  submitted: boolean = false

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
    private session: SessionStorageService
  ) { }



  ngOnInit(): void {
    this.userService.isAdmin().subscribe(
      isAdmin => { if (!isAdmin) this.router.navigate(['/home']) },
      error => { this.router.navigate(['/home']) }
    )

    this.userService.getAllUsers().subscribe(users => this.listUsers = users)

    this.segundosTimer = setInterval(() => {
      this.actualizarSegundos()
    }, 100)
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


  updateUser(user: User){
    this.userService.updateUser(user).subscribe()
  }


  deleteUser(email: string){
    this.userService.deleteUser(email).subscribe(isDeleted=>this.userService.getAllUsers().subscribe(users => this.listUsers = users))
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

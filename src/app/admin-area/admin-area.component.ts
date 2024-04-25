import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../Clases/user/user';
import { UserService } from '../services/user/user.service';
import { differenceInSeconds } from 'date-fns';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-area',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.css'
})


export class AdminAreaComponent implements OnInit, OnDestroy {
  listUsers: User[] = new Array()
  segundosTimer: any
  showForm: boolean = false
  submitted: boolean = false
  nuevoUsuarioForm = this.formBuilder.group({
    nickname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    nombre: [''],
    apellidos: [''],
    f_registro: [''],
    ult_conex: [''],
    dir: [''],
    tlf: [''],
    f_nac: [''],
    nivel: [''],
    rol: ['']
  })



  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    this.userService.isAdmin().subscribe(
      isAdmin => { if (!isAdmin) this.router.navigate(['/home']) },
      error => { this.router.navigate(['/home']) }
    )

    this.userService.getAllUsers().subscribe(users => this.listUsers = users)

    this.segundosTimer = setInterval(() => {
      this.actualizarSegundos()
    }, 1000)
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


  toggleForm(): void {
    this.showForm = !this.showForm
  }


  get f() { 
    return this.nuevoUsuarioForm.controls 
  }

  onSubmit() {
    this.submitted=true
    if (this.nuevoUsuarioForm.invalid) {
      return
    }

    console.log('Formulario válido, enviar datos:', this.nuevoUsuarioForm.value);
  }
}

import { Component } from '@angular/core';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../Clases/user/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { UserRequest } from '../Clases/user/user-request';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  visible: string = 'password'
  existsNickname: boolean = false
  existsEmail: boolean = false
  user: User = new User()

  userForm = this.formBuilder.group({
    nickname: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    surnames: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [parseInt(''), Validators.required],
    birthday: ['', Validators.required],
    address: ['', Validators.required],
    level: ['', Validators.required]
  })


  constructor(
    private session: SessionStorageService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ){}


  saveUser(){
    if(this.userForm.valid){

      const userFormToSave = {
        nickname: this.nickname.value,
        password: this.password.value,
        name: this.name.value,
        surnames: this.surnames.value,
        email: this.email.value,
        phone: this.phone.value,
        birthday: this.parseToBirthday2(this.birthday.value),
        address: this.address.value,
        level: this.level.value
      }
  
      this.loginService.signUp(userFormToSave as UserRequest).subscribe(()=>this.router.navigate(['/home']).then(()=>window.location.reload()))
    }
  }


  togglePasswordVisibility() {
    this.visible = this.visible === 'password' ? 'text' : 'password';
  }


  parseToBirthday2(dateToFormat: any): any {
    if (!dateToFormat) return null
  
    const date = new Date(dateToFormat)
  
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
  
    return `${year}-${month}-${day}T00:00:00`
  }


  checkExistence(nickname: any){
    if(nickname.value!=""&&nickname.value!=" "&&nickname.value!=null) this.userService.existsNickname(nickname.value).subscribe(exists => this.existsNickname=exists)
  }

  checkExistenceEmail(email: any){
    if(email.value!=""&&email.value!=" "&&email.value!=null) this.userService.existsEmail(email.value).subscribe(exists => this.existsEmail=exists)
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }



  get nickname() {
    return this.userForm.controls.nickname;
  }

  get password() {
    return this.userForm.controls.password;
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

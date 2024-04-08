import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { LoginRequest } from '../Clases/user/loginRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginError: string = ""
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}


  login(){
    this.loginError = ""  

    this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
      next: userData => {
        console.log('Token aceptado', userData)
      },
      error: errorData => {         
        this.loginError = errorData
      },
      complete: () => {
        window.location.reload()
        this.loginForm.reset()
      }
    })
  }


  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}

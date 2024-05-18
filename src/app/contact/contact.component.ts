import { Component } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../services/message/message.service';
import { Message } from '../Clases/Message/message';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, CommonModule, ReactiveFormsModule, FooterComponent, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})


export class ContactComponent {
  formSubmitted: boolean = false
  showMessage: boolean = false
  error: boolean = false

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}')]],
    content: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  })



  constructor(
    private session: SessionStorageService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ){}



  contact(){
    this.formSubmitted = true
    if (!this.showMessage && this.loginForm.valid) {
      const message: Message = {
        email: this.email.value || "", 
        content: this.content.value || "",   
        date: new Date() 
      }

      this.messageService.addMessage(message).subscribe(()=> this.showMessage=true)
    } 
    if(this.showMessage) {
      this.error=true
      this.loginForm.reset()
    }
    else this.loginForm.markAllAsTouched() // Marcar todos los campos como tocados para mostrar los mensajes de error
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }


  get email() {
    return this.loginForm.controls.email;
  }

  get content() {
    return this.loginForm.controls.content;
  }

  get terms() {
    return this.loginForm.controls.terms;
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuNavbarLoggeadoComponent } from '../menu-navbar-loggeado/menu-navbar-loggeado.component';
import { MenuNavbarSinLoggearComponent } from '../menu-navbar-sin-loggear/menu-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { SessionStorageService } from '../services/sessionStorage/session-storage.service';
import { MessageService } from '../services/message/message.service';
import { Router, RouterLink } from '@angular/router';
import { Message } from '../Clases/Message/message';


@Component({
  selector: 'app-contact-area',
  standalone: true,
  imports: [MenuNavbarLoggeadoComponent, MenuNavbarSinLoggearComponent, CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, RouterLink],
  templateUrl: './contact-area.component.html',
  styleUrl: './contact-area.component.css'
})


export class ContactAreaComponent implements OnInit{
  messages: Message[] = new Array()
  selectedSortOption: string = 'default';



  constructor(
    private session: SessionStorageService,
    private messageService: MessageService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.messageService.getMessageById(this.session.getItem("email")).subscribe(message => this.messages=message)
  }


  sortProducts() {
    switch (this.selectedSortOption) {
      case 'asc': 
        this.messages.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA.getTime() - dateB.getTime()
        })
        break
      case 'desc': 
        this.messages.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateB.getTime() - dateA.getTime()
        })
        break
      default:
        break
    }
  }


  isLogged(): boolean{
    if(this.session.getItem('email')==null||this.session.getItem('email')==""||this.session.getItem('email')==undefined) return false
    return true
  }
}

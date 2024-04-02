import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavbarLoggeadoComponent } from './menu-navbar-loggeado.component';

describe('MenuNavbarLoggeadoComponent', () => {
  let component: MenuNavbarLoggeadoComponent;
  let fixture: ComponentFixture<MenuNavbarLoggeadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNavbarLoggeadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuNavbarLoggeadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

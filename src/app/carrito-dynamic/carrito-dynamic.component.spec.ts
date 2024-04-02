import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDynamicComponent } from './carrito-dynamic.component';

describe('CarritoDynamicComponent', () => {
  let component: CarritoDynamicComponent;
  let fixture: ComponentFixture<CarritoDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

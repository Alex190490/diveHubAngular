import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDetailsComponent } from './carrito-details.component';

describe('CarritoDetailsComponent', () => {
  let component: CarritoDetailsComponent;
  let fixture: ComponentFixture<CarritoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

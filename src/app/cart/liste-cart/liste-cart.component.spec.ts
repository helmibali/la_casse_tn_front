import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCartComponent } from './liste-cart.component';

describe('ListeCartComponent', () => {
  let component: ListeCartComponent;
  let fixture: ComponentFixture<ListeCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

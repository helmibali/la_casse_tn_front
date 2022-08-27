import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitByIdComponent } from './produit-by-id.component';

describe('ProduitByIdComponent', () => {
  let component: ProduitByIdComponent;
  let fixture: ComponentFixture<ProduitByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

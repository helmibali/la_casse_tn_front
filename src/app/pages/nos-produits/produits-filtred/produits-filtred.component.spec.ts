import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFiltredComponent } from './produits-filtred.component';

describe('ProduitsFiltredComponent', () => {
  let component: ProduitsFiltredComponent;
  let fixture: ComponentFixture<ProduitsFiltredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsFiltredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsFiltredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

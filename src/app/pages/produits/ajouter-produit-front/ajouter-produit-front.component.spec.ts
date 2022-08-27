import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProduitFrontComponent } from './ajouter-produit-front.component';

describe('AjouterProduitFrontComponent', () => {
  let component: AjouterProduitFrontComponent;
  let fixture: ComponentFixture<AjouterProduitFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProduitFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProduitFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsSearchComponent } from './produits-search.component';

describe('ProduitsSearchComponent', () => {
  let component: ProduitsSearchComponent;
  let fixture: ComponentFixture<ProduitsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

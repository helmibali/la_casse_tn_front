import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionSocialComponent } from './inscription-social.component';

describe('InscriptionSocialComponent', () => {
  let component: InscriptionSocialComponent;
  let fixture: ComponentFixture<InscriptionSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

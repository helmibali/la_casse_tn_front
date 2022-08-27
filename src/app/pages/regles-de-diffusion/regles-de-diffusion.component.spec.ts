import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglesDeDiffusionComponent } from './regles-de-diffusion.component';

describe('ReglesDeDiffusionComponent', () => {
  let component: ReglesDeDiffusionComponent;
  let fixture: ComponentFixture<ReglesDeDiffusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglesDeDiffusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglesDeDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

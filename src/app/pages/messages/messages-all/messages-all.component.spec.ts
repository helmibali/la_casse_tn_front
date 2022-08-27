import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesAllComponent } from './messages-all.component';

describe('MessagesAllComponent', () => {
  let component: MessagesAllComponent;
  let fixture: ComponentFixture<MessagesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

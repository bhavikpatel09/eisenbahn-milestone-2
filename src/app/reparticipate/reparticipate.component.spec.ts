import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparticipateComponent } from './reparticipate.component';

describe('ReparticipateComponent', () => {
  let component: ReparticipateComponent;
  let fixture: ComponentFixture<ReparticipateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparticipateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGateComponent } from './age-gate.component';

describe('AgeGateComponent', () => {
  let component: AgeGateComponent;
  let fixture: ComponentFixture<AgeGateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeGateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

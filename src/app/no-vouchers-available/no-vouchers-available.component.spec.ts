import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVouchersAvailableComponent } from './no-vouchers-available.component';

describe('NoVouchersAvailableComponent', () => {
  let component: NoVouchersAvailableComponent;
  let fixture: ComponentFixture<NoVouchersAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoVouchersAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVouchersAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

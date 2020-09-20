import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherAvailableComponent } from './voucher-available.component';

describe('VoucherAvailableComponent', () => {
  let component: VoucherAvailableComponent;
  let fixture: ComponentFixture<VoucherAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

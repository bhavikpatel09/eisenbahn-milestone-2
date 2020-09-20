import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherErrorComponent } from './voucher-error.component';

describe('VoucherErrorComponent', () => {
  let component: VoucherErrorComponent;
  let fixture: ComponentFixture<VoucherErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

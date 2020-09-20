import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedVoucherComponent } from './unused-voucher.component';

describe('UnusedVoucherComponent', () => {
  let component: UnusedVoucherComponent;
  let fixture: ComponentFixture<UnusedVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnusedVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusedVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidCpfComponent } from './invalid-cpf.component';

describe('InvalidCpfComponent', () => {
  let component: InvalidCpfComponent;
  let fixture: ComponentFixture<InvalidCpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidCpfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

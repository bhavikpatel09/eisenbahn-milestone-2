import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskCpfNumberComponent } from './ask-cpf-number.component';

describe('AskCpfNumberComponent', () => {
  let component: AskCpfNumberComponent;
  let fixture: ComponentFixture<AskCpfNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskCpfNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskCpfNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

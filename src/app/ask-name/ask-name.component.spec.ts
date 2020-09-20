import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNameComponent } from './ask-name.component';

describe('AskNameComponent', () => {
  let component: AskNameComponent;
  let fixture: ComponentFixture<AskNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

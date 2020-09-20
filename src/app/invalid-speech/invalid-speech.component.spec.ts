import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidSpeechComponent } from './invalid-speech.component';

describe('InvalidSpeechComponent', () => {
  let component: InvalidSpeechComponent;
  let fixture: ComponentFixture<InvalidSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidSpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

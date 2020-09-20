import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSpeechComponent } from './practice-speech.component';

describe('PracticeSpeechComponent', () => {
  let component: PracticeSpeechComponent;
  let fixture: ComponentFixture<PracticeSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeSpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

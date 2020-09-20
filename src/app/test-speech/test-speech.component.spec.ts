import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSpeechComponent } from './test-speech.component';

describe('TestSpeechComponent', () => {
  let component: TestSpeechComponent;
  let fixture: ComponentFixture<TestSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

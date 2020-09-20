import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadySpeechComponent } from './ready-speech.component';

describe('ReadySpeechComponent', () => {
  let component: ReadySpeechComponent;
  let fixture: ComponentFixture<ReadySpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadySpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadySpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

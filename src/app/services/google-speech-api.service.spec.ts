import { TestBed } from '@angular/core/testing';

import { GoogleSpeechApiService } from './google-speech-api.service';

describe('GoogleSpeechApiService', () => {
  let service: GoogleSpeechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSpeechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

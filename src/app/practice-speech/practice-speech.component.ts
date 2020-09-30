import { Component, OnInit, OnDestroy } from '@angular/core';

import { AudioRecordingService } from '../services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleSpeechApiService } from '../services/google-speech-api.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-practice-speech',
  templateUrl: './practice-speech.component.html',
  styleUrls: ['./practice-speech.component.css']
})
export class PracticeSpeechComponent implements OnInit, OnDestroy {

  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  soundwave: string = './assets/images/Soundwave.png';
  recordButtonImage: string = './assets/images/RecordButton.png';
  apiResponse = '';
  isProcessing = false;

  constructor(
    private modalService: DialogModalService, private shareService: ShareService,
    private googleSpeechApiService: GoogleSpeechApiService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router
  ) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      console.log("Failed Recording");
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      console.log("Getting Recorded Blob");
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      console.log(this.blobUrl);
      this.processRecordedFileData(data);
    });
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }


  ngOnInit(): void {

  }

  processRecordedFileData(data: any): void {
    this.isProcessing = true;
    if (data != null) {
      console.log(data.blob);
      console.log(data.title);

      new Response(data.blob).arrayBuffer()
        .then((byteArray) => {
          this.googleSpeechApiService.postSpeechRecognision({
            config: {
              languageCode: 'de-DE',
              audio_channel_count: 2,
            },
            audio: {
              content: this.arrayBufferToBase64(byteArray)
            }
          }).subscribe((response: any) => {
            setTimeout(() => {
              this.isProcessing = false;
              console.log(response);
              if (response !== undefined && response.results != null && response.results.length > 0) {
                const responseWord = response.results[0].alternatives[0].transcript;

                if (responseWord === 'eisenbahn' || responseWord === 'Eisenbahn') {
                  this.apiResponse = responseWord;
                }
                else {
                  this.apiResponse = responseWord;
                }
              }
              else {
                this.apiResponse = '';
              }
            }, 500);

          });
        });
    }
  }

  arrayBufferToBase64(buffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  startRecording(event): void {
    if (event) {
      event.preventDefault();
    }

    console.log("Starting Recording");
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
    setTimeout(() => {
      this.soundwave = './assets/images/Soundwave.gif';
    }, 500);

  }

  abortRecording(): void {
    console.log("Abort Recording");
    this.soundwave = './assets/images/Soundwave.png';
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording(event): void {
    console.log("Stopping Recording");
    this.soundwave = './assets/images/Soundwave.png';
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData(): void {
    this.soundwave = './assets/images/Soundwave.png';
    console.log("Clear Recording");
    this.blobUrl = null;
    this.apiResponse = '';
  }
  getRecordButtonImage(): string {
    let imageSrc = './assets/images/RecordButton.png';
    if (this.isRecording) {
      imageSrc = './assets/images/RecordButton-Dark.png';
    }
    return imageSrc;
  }
  navigateNext(): void {
    this.router.navigate(['ready-speech']);
  }
  ngOnDestroy(): void {
    this.abortRecording();
  }

}

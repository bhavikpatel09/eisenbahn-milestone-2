import { Component, OnInit, OnDestroy } from '@angular/core';

import { AudioRecordingService } from '../services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleSpeechApiService } from '../services/google-speech-api.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';
import { ConsumerParams } from '../models/consumer-params';

@Component({
  selector: 'app-practice-speech',
  templateUrl: './practice-speech.component.html',
  styleUrls: ['./practice-speech.component.css']
})
export class PracticeSpeechComponent implements OnInit, OnDestroy {

  isRecordingPractice = false;
  recordedTimePractice: any;
  blobUrlPractice: any;
  soundwavePractice: string = './assets/images/Soundwave.png';
  recordButtonImagePractice: string = './assets/images/RecordButton.png';
  apiResponsePractice = '';
  isProcessingPractice = false;
  consumerParams: ConsumerParams;
  
  constructor(
    private modalService: DialogModalService, private shareService: ShareService,
    private googleSpeechApiService: GoogleSpeechApiService,
    private audioRecordingServicePractice: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router
  ) {

    this.audioRecordingServicePractice.recordingFailed().subscribe(() => {
      console.log("Failed Recording");
      this.isRecordingPractice = false;
    });

    this.audioRecordingServicePractice.getRecordedTime().subscribe((time) => {
      this.recordedTimePractice = time;
    });

    this.audioRecordingServicePractice.getRecordedBlob().subscribe((dataPractice) => {
      console.log("Getting Recorded Blob");
      this.blobUrlPractice = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(dataPractice.blob));
      console.log(this.blobUrlPractice);
      this.processRecordedFileDataPractice(dataPractice);
    });
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }


  ngOnInit(): void {
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
  }

  processRecordedFileDataPractice(dataPractice: any): void {
    this.isProcessingPractice = true;
    if (dataPractice != null) {
      console.log(dataPractice.blob);
      console.log(dataPractice.title);

      new Response(dataPractice.blob).arrayBuffer()
        .then((byteArrayPractice) => {
          this.googleSpeechApiService.postSpeechRecognision({
            config: {
              languageCode: 'de-DE',
              audio_channel_count: 2,
            },
            audio: {
              content: this.arrayBufferToBase64(byteArrayPractice)
            }
          }).subscribe((responsePractice: any) => {
            setTimeout(() => {
              this.isProcessingPractice = false;
              console.log("recordResponse");
              console.log(responsePractice);
              if (responsePractice !== undefined && responsePractice.results != null && responsePractice.results.length > 0) {
                const responseWordPractice = responsePractice.results[0].alternatives[0].transcript;

                if (responseWordPractice === 'eisenbahn' || responseWordPractice === 'Eisenbahn') {
                  this.apiResponsePractice = responseWordPractice;
                }
                else {
                  this.apiResponsePractice = responseWordPractice;
                }
              }
              else {
                this.apiResponsePractice = '';
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

  startRecordingPractice(eventPractice): void {
    if (eventPractice) {
      eventPractice.preventDefault();
    }

    console.log("Starting Recording Practice");
    if (!this.isRecordingPractice) {
      this.isRecordingPractice = true;
      this.audioRecordingServicePractice.startRecording();
    }
    setTimeout(() => {
      this.soundwavePractice = './assets/images/Soundwave.gif';
    }, 500);

  }

  abortRecordingPractice(): void {
    console.log("Abort Recording");
    this.soundwavePractice = './assets/images/Soundwave.png';
    if (this.isRecordingPractice) {
      this.isRecordingPractice = false;
      this.audioRecordingServicePractice.abortRecording();
    }
  }

  stopRecordingPractice(event): void {
    console.log("Stopping Recording");
    this.soundwavePractice = './assets/images/Soundwave.png';
    if (this.isRecordingPractice) {
      this.audioRecordingServicePractice.stopRecording();
      this.isRecordingPractice = false;
    }
  }

  clearRecordedDataPractice(): void {
    this.soundwavePractice = './assets/images/Soundwave.png';
    console.log("Clear Recording");
    this.blobUrlPractice = null;
    this.apiResponsePractice = '';
  }
  getRecordButtonImagePractice(): string {
    let imageSrcPractice = './assets/images/RecordButton.png';
    if (this.isRecordingPractice) {
      imageSrcPractice = './assets/images/RecordButton-Dark.png';
    }
    return imageSrcPractice;
  }
  navigateNextPractice(): void {
    this.router.navigate(['ready-speech']);
  }
  ngOnDestroy(): void {
    this.abortRecordingPractice();
  }

}

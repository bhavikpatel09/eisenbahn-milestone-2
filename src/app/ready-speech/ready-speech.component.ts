import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';

import { GoogleSpeechApiService } from '../services/google-speech-api.service';
import { Subject } from 'rxjs';
import { AudioRecordingService } from '../services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { VoucherRequest } from '../models/voucher-request';



@Component({
  selector: 'app-ready-speech',
  templateUrl: './ready-speech.component.html',
  styleUrls: ['./ready-speech.component.css']
})
export class ReadySpeechComponent implements OnInit, OnDestroy {

  @ViewChild('button') button: ElementRef;
  @ViewChild('buttonPractice') buttonPractice: ElementRef;
  longPress = 'first state';
  longPressing = 0;
  longPressingPractice = 0;
  isLongPressed = false;
  isLongPressedPractice = false;



  //START -- Practice Variables
  isRecordingPractice = false;
  recordedTimePractice: any;
  blobUrlPractice: any;
  soundwavePractice: string = './assets/images/Soundwave.png';
  recordButtonImagePractice: string = './assets/images/RecordButton.png';
  apiResponsePractice = '';
  isProcessingPractice = false;

  //END -- Practice Variables


  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  isProcessing = false;
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;
  progress: number;
  progressPractice: number;

  apiResponse: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private audio: any;
  private interval: any;
  private recordInterval: any;
  private recordIntervalPractice: any;
  shortTimeOccurred = false;
  shortTimeOccurredPractice = false;

  recordingTime: number;
  recordingTimePractice: number;
  isShowComponent = false;
  playingTime: number;//recordingTime
  // isFirstTimeCalled = false;
  // isAlreadyInMouseMove = false;
  readyRecording = false;
  ready = false;

  @ViewChild('audioBeep') audioPlayerRef: ElementRef;


  playAudio(event: any) {
    if (event) {
      event.preventDefault();
    }
    console.log("playaudio event called");
    let audio = new Audio();
    audio.src = "../../../assets/media/beep_02.mp3";
    audio.load();
    audio.play();
    console.log("playaudio event end");
  }
  constructor(
    private modalService: DialogModalService,
    private googleSpeechApiService: GoogleSpeechApiService,
    private audioRecordingService: AudioRecordingService,
    //private audioRecordingServicePractice: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router,
    private shareService: ShareService,
    private consumerService: ConsumerService,
    private elementRef: ElementRef
  ) {

    this.audio = new Audio();
    this.audio.src = '../../../assets/media/beep_02.mp3';
    // this.audio.src = '../../../assets/media/beep.wav';
    this.audio.onended = () => {
      this.audio.pause();
      clearInterval(this.interval);
      this.playingTime = 0;
      // console.log(this.recordingTime);
      console.log("Beep ended");
      // if (this.readyRecording) {
      //   console.log("on click call");
      //   console.log("start recording");
      //   //event.stopPropagation();
      //   if (!this.isRecording) {
      //     this.recordedTime = 0;
      //     this.isRecording = true;
      //     this.startRecordTimeOut();
      //     this.audioRecordingService.startRecording();
      //   }
      // }
      // else {
      //   console.log("Error handled and marked true for second time call");
      //   this.isFirstTimeCalled = true;
      // }

      // if(!this.isFirstTimeCalled){
      //   this.isFirstTimeCalled = true;
      // }
    };
    this.audio.onplaying = () => {
      // this.recordingTime = 0;
      // console.log(this.recordingTime);
      this.playingTime = 0;

      this.recordingTime = 0;
      this.startTimeOut();

    };
    this.audio.load();

    this.route.queryParams.subscribe(params => {
      this.ready = (params['isReady'] === 'true' ? true : false);
      if (this.ready) {
        this.iAmReady();
      }
      else {
        this.readyRecording = false;
      }
    });
    //START -- Practice Screen Events
    // this.audioRecordingServicePractice.recordingFailed().subscribe(() => {
    //   console.log("Failed Recording");
    //   this.isRecordingPractice = false;
    // });

    // this.audioRecordingServicePractice.getRecordedTime().subscribe((time) => {
    //   this.recordedTimePractice = time;
    // });

    // this.audioRecordingServicePractice.getRecordedBlob().subscribe((dataPractice) => {
    //   console.log("Getting Recorded Blob");
    //   this.blobUrlPractice = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(dataPractice.blob));
    //   console.log(this.blobUrlPractice);
    //   this.processRecordedFileDataPractice(dataPractice);
    // });

    //END -- Practice Screen Events


    this.audioRecordingService.recordingFailed().subscribe(() => {
      if (!this.ready) {
        this.isRecordingPractice = false;
      }
      else {
        this.isRecording = false;
      }
      console.log("Failed Recording");

    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      if (!this.ready) {
        this.recordedTimePractice = time;
      }
      else {
        this.recordedTime = time;
      }

    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      if (!this.ready) {
        console.log("Getting Recorded Blob");
        this.blobUrlPractice = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
        console.log(this.blobUrlPractice);
        this.processRecordedFileDataPractice(data);
      }
      else {
        this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
        console.log(this.blobUrl);
        this.processRecordedFileData(data);
      }

    });

    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  onLongPressPractice() {
    this.longPressingPractice = null;
    this.progressPractice = 0;
    this.shortTimeOccurredPractice = false;
    console.log('on long press Practice');
    // if (this.isLongPressed) this.button.nativeElement.style.backgroundColor = 'green';
    // else this.button.nativeElement.style.backgroundColor = 'orange';
    // this.isLongPressed = !this.isLongPressed;
    // this.longPress = this.isLongPressed ? 'second state' : 'first state';
  }
  onLongPressingPractice() {
    //this.audio !== undefined &&
    if (this.longPressingPractice === 1) {

      this.startRecordingPractice(null);
      // if (!this.isRecordingPractice) {
      //   this.recordedTimePractice = 0;
      //   this.isRecordingPractice = true;
      //   this.startRecordTimeOutPractice();
      //   this.audioRecordingService.startRecording();
      // }
    }
    if (this.progressPractice < 100) {
      this.progressPractice = this.longPressingPractice * 2;
    }

    console.log(this.longPressingPractice);
    this.longPressingPractice += 1;
    if (this.longPressingPractice < 20) {
      this.isLongPressedPractice = false;
    }
    else {
      this.isLongPressedPractice = true;
    }
  }
  endedPressPractice() {
    console.log('long press Practice ended');
    if (this.isLongPressedPractice) {
      this.soundwavePractice = './assets/images/Soundwave.png';
      this.stopRecordingPractice(null);
      // if (this.isPlaying()) { return; }
      // console.log("Beep started playing");

      // this.readyRecording = true;
      // if (!this.isRecording) {
      //   this.audio.muted = false;
      //   this.audio.play();
      //   this.shortTimeOccurred = false;
      // }
    }
    else {
      clearInterval(this.recordIntervalPractice);
      this.soundwavePractice = './assets/images/Soundwave.png';
      this.abortRecordingPractice();
      this.shortTimeOccurredPractice = true;
    }
    this.longPressingPractice = null;
    this.progressPractice = 0;
    //debugger;
  }

  getSoundwavePractice(): string {
    return this.soundwavePractice;
  }
  onLongPress() {
    this.longPressing = null;
    this.progress = 0;
    this.shortTimeOccurred = false;
    console.log('on long press');
    // if (this.isLongPressed) this.button.nativeElement.style.backgroundColor = 'green';
    // else this.button.nativeElement.style.backgroundColor = 'orange';
    // this.isLongPressed = !this.isLongPressed;
    // this.longPress = this.isLongPressed ? 'second state' : 'first state';
  }

  onLongPressing() {
    //this.audio !== undefined &&
    if (this.longPressing === 1) {

      // this.playAudio(null);
      // if (this.isPlaying()) {
      //   this.audio.pause();
      // }
      // this.audio.muted = false;
      // this.audio.play();
      if (!this.isRecording) {
        this.recordedTime = 0;
        this.isRecording = true;
        this.startRecordTimeOut();
        this.audioRecordingService.startRecording();
      }
    }
    if (this.progress < 100) {
      this.progress = this.longPressing * 2;
    }

    console.log(this.longPressing);
    this.longPressing += 1;
    if (this.longPressing < 20) {
      this.isLongPressed = false;
    }
    else {
      this.isLongPressed = true;
    }
  }

  endedPress() {
    console.log('long press ended');
    if (this.isLongPressed) {

      this.stopRecording(null);
      // if (this.isPlaying()) { return; }
      // console.log("Beep started playing");

      // this.readyRecording = true;
      // if (!this.isRecording) {
      //   this.audio.muted = false;
      //   this.audio.play();
      //   this.shortTimeOccurred = false;
      // }
    }
    else {
      clearInterval(this.recordInterval);
      this.abortRecording();
      this.shortTimeOccurred = true;
    }
    this.longPressing = null;
    this.progress = 0;
    //debugger;
  }

  iAmReady(): void {
    if (this.audio !== undefined) {
      if (this.isPlaying()) {
        this.audio.pause();
      }
      this.audio.muted = true;
      this.audio.play();
    }
    this.ready = true;
  }

  getOuterStokeColorPractice(): string {
    return (this.progressPractice > 0 ? '#bb1c1c' : 'transparent');
  }
  getOuterStokeColor(): string {
    return (this.progress > 0 ? '#bb1c1c' : 'transparent');
  }
  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => this.consumerParams = consumerParams);
    // this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
    this.voucherDetails = this.shareService.getVoucherDetails();
    // this.isFirstTimeCalled = false;
    setTimeout(() => {
      this.isShowComponent = true;
    }, 1500);
  }
  formClick(): void {
    console.log("form click");
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
              console.log("recordResponse");
              console.log(response);
              if (response !== undefined && response.results != null && response.results.length > 0) {
                const responseWord = response.results[0].alternatives[0].transcript;

                if (responseWord === 'eisenbahn' || responseWord === 'Eisenbahn') {
                  this.isProcessing = false;
                  this.apiResponse = 'Congrats!!! You are eligible for the voucher!!!';
                  const voucherRequest: VoucherRequest = {
                    consumidor: {
                      documento: this.consumerParams?.consumer?.documento,
                      nome: this.consumerParams?.consumer?.nome,
                      id: this.consumerParams?.consumer?.id
                    },
                    cidade: {
                      id: this.consumerParams?.city?.id,
                      nome: this.consumerParams?.city?.nome
                    },
                    cliente: {
                      id: this.consumerParams?.restaurant?.id,
                      nome: this.consumerParams?.restaurant?.nome,
                      cidade: this.consumerParams?.restaurant?.cidade
                    }
                  };
                  this.postVoucherRequest(voucherRequest, true);
                }
                else {
                  this.isProcessing = false;

                  const voucherRequest: VoucherRequest = {
                    consumidor: {
                      documento: this.consumerParams?.consumer?.documento,
                      nome: this.consumerParams?.consumer?.nome,
                      id: this.consumerParams?.consumer?.id
                    },
                    cidade: {
                      id: this.consumerParams?.city?.id,
                      nome: this.consumerParams?.city?.nome
                    },
                    cliente: {
                      id: this.consumerParams?.restaurant?.id,
                      nome: this.consumerParams?.restaurant?.nome,
                      cidade: this.consumerParams?.restaurant?.cidade
                    }
                  };
                  this.postVoucherRequest(voucherRequest, false);

                  // this.router.navigate(['invalid-speech']);
                  this.apiResponse = 'Recorded word: ' + responseWord;
                }
              }
              else {
                this.isProcessing = false;
                this.apiResponse = 'Please try again!!!';
                const voucherRequest: VoucherRequest = {
                  consumidor: {
                    documento: this.consumerParams?.consumer?.documento,
                    nome: this.consumerParams?.consumer?.nome,
                    id: this.consumerParams?.consumer?.id
                  },
                  cidade: {
                    id: this.consumerParams?.city?.id,
                    nome: this.consumerParams?.city?.nome
                  },
                  cliente: {
                    id: this.consumerParams?.restaurant?.id,
                    nome: this.consumerParams?.restaurant?.nome,
                    cidade: this.consumerParams?.restaurant?.cidade
                  }
                };
                this.postVoucherRequest(voucherRequest, false);
              }
            }, 1000);
          });
        });
    }
  }

  postVoucherRequest(voucherRequest: VoucherRequest, isSuccess: boolean): void {
    this.consumerService.postRequestVoucher(voucherRequest).subscribe(result => {
      //success
      console.log("success post in voucher request");
      this.consumerService.validateConsumer(this.consumerParams.consumer.documento).subscribe(validateResponse => {
        console.log("success validate consumer and get voucher details");
        if (validateResponse) {
          if (validateResponse.success && validateResponse.success === true) {
            if (validateResponse.data) {
              const resultData = validateResponse.data;
              const voucherStatus = resultData.status;
              this.voucherDetails = {
                id: resultData.id,
                codigo: resultData.codigo,
                data_cadastro: resultData.data_cadastro,
                data_ativacao: resultData.data_ativacao,
                data_utilizacao: resultData.data_utilizacao,
                status: resultData.status,
                cliente: resultData.cliente,
                consumidor: resultData.consumidor
              };
              this.shareService.setVoucherDetails(this.voucherDetails);
              //redirect to voucher details page
              if (voucherStatus === voucherStatus.utilized) {
                this.router.navigate(['reparticipate']);
              }
              else {
                // this.router.navigate(['voucher-available']);
                if (isSuccess) {
                  this.router.navigate(['voucher-details']);
                }
                else {
                  this.router.navigate(['invalid-speech']);
                }
              }
            }
          }
        }
      });
    },
      response => {

        const errorResponse = response.error;
        if (errorResponse) {
          console.log("error post in voucher request: " + errorResponse.status);
          if (errorResponse.status === 404) {
            //this.router.navigate(['voucher-error'], { queryParams: { errorMessage: errorResponse.error } });
            //There are no vouchers available, please try later.
            this.router.navigate(['no-voucher-available']);
          }
          else if (errorResponse.status === 409) {
            this.router.navigate(['voucher-error'], { queryParams: { errorMessage: errorResponse.error } });
            //You have now generated a voucher, please try again in a few days.
          }
        }
      });
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

  startRecording(event: any): void {
    debugger;
    if (event) {
      event.preventDefault();
    }
    // if (this.isPlaying()) { return; }
    // console.log("Beep started playing");

    this.readyRecording = true;
    if (!this.isRecording) {
      // if (this.isPlaying()) {
      //   this.audio.pause();
      // }
      // this.audio.muted = false;
      // this.audio.play();
      this.shortTimeOccurred = false;
    }
    // if (!this.isRecording) {
    //   // this.audio.play();
    //   this.audio.muted = false;
    //   const playedPromise = this.audio.play();
    //   if (playedPromise) {
    //     playedPromise.catch((e) => {
    //       console.log(e);
    //       if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
    //         console.log(e.name);
    //       }
    //     }).then(() => {

    //     });
    //   }
    // }
    // else {
    //   console.log("already recording");
    // }
  }

  abortRecording(): void {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording(event: any): void {

    console.log("in stop recording");
    clearInterval(this.recordInterval);
    // console.log('recordingtime');
    // console.log(this.recordingTime);
    // if (this.recordingTime < 2) {
    //   //message enable here;
    //   this.shortTimeOccurred = true;
    //   this.abortRecording();
    // }
    // else {
    this.shortTimeOccurred = false;
    this.recordingTime = 0;
    console.log('stop recording');
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
    // }
    //this.recordingTime = 0;
  }


  getRecordButtonImage(): string {
    let imageSrc = './assets/images/RecordButton.png';
    if (this.longPressing) {
      imageSrc = './assets/images/RecordButton-Dark.png';
    }
    return imageSrc;
  }

  clearRecordedData(): void {
    console.log("clear recording");
    this.blobUrl = null;
    this.apiResponse = '';
  }

  startRecordTimeOutPractice(): void {
    this.recordingTimePractice = 0;
    console.log('Start Recording Timer');
    this.recordIntervalPractice = setInterval(
      () => {
        console.log(this.recordingTimePractice);
        this.recordingTimePractice = this.recordingTimePractice + 1;
      },
      500
    );
  }

  startRecordTimeOut(): void {
    this.recordingTime = 0;
    console.log('Start Recording Timer');
    this.recordInterval = setInterval(
      () => {
        console.log(this.recordingTime);
        this.recordingTime = this.recordingTime + 1;
      },
      500
    );
  }

  startTimeOut(): void {

    this.interval = setInterval(
      () => {
        console.log(this.playingTime);
        if (this.playingTime === 4 || !this.isPlaying()) {
          clearInterval(this.interval);
          this.playingTime = 0;
        }
        else {
          this.playingTime = this.playingTime + 1;
        }

        console.log(this.recordingTime);
        // if (this.recordingTime === 4 || !this.isPlaying()) {
        //   clearInterval(this.interval);
        //   this.recordingTime = 0;
        // }
        // else {
        this.recordingTime = this.recordingTime + 1;
        // }

      },
      1000
    );
  }
  isPlaying(): boolean {
    // console.log(!this.audio.paused);
    return !this.audio.paused;
  }


  //Start -- Practice Methods 
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
                console.log(responseWordPractice);
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

  startRecordingPractice(eventPractice): void {
    if (eventPractice) {
      eventPractice.preventDefault();
    }
    this.apiResponsePractice = '';
    console.log("Starting Recording Practice");
    if (!this.isRecordingPractice) {
      this.isRecordingPractice = true;
      this.audioRecordingService.startRecording();
      setTimeout(() => {
        this.soundwavePractice = './assets/images/Soundwave.gif';
      }, 500);
    }
  }

  abortRecordingPractice(): void {
    console.log("Abort Recording");
    this.soundwavePractice = './assets/images/Soundwave.png';
    console.log(this.soundwavePractice);
    if (this.isRecordingPractice) {
      this.isRecordingPractice = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecordingPractice(event): void {
    console.log("Stopping Recording");
    this.soundwavePractice = './assets/images/Soundwave.png';
    console.log(this.soundwavePractice);
    if (this.isRecordingPractice) {
      this.audioRecordingService.stopRecording();
      this.isRecordingPractice = false;
    }
  }

  clearRecordedDataPractice(): void {
    this.soundwavePractice = './assets/images/Soundwave.png';
    console.log(this.soundwavePractice);
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
    // this.router.navigate(['ready-speech']);
    //this.iAmReady();
    const queryParams = { isReady: true };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

  }
  //End -- Practice Methods
  ngOnDestroy(): void {
    this.abortRecordingPractice();
    this.abortRecording();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

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

  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  isProcessing = false;
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;

  apiResponse: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalService: DialogModalService,
    private googleSpeechApiService: GoogleSpeechApiService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router,
    private shareService: ShareService,
    private consumerService: ConsumerService
  ) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      console.log(this.blobUrl);
      this.processRecordedFileData(data);
    });
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }


  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => this.consumerParams = consumerParams);
    // this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
    this.voucherDetails = this.shareService.getVoucherDetails();
  }

  // processRecordedFile(): void {
  //   this.googleSpeechApiService.postSpeechRecognision({
  //     config: {
  //       encoding: 'FLAC',
  //       languageCode: 'en-US'
  //     },
  //     audio: {
  //       uri: 'gs://cloud-samples-tests/speech/brooklyn.flac'
  //     }
  //   }).subscribe((response: any) => {
  //     console.log(response);
  //     this.apiResponse = response;
  //   });
  // }

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
            this.router.navigate(['voucher-error'], { queryParams: { errorMessage: errorResponse.error } });
            //There are no vouchers available, please try later.
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
    if (event) {
      event.preventDefault();
    }
    console.log("start recording");
    //event.stopPropagation();
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording(): void {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording(event: any): void {
    console.log("stop recording");
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  getRecordButtonImage(): string {
    let imageSrc = './assets/images/RecordButton.png';
    if (this.isRecording) {
      imageSrc = './assets/images/RecordButton-Dark.png';
    }
    return imageSrc;
  }

  clearRecordedData(): void {
    console.log("clear recording");
    this.blobUrl = null;
    this.apiResponse = '';
  }

  ngOnDestroy(): void {
    this.abortRecording();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { ConsumerParams } from '../models/consumer-params';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-play-speech',
  templateUrl: './play-speech.component.html',
  styleUrls: ['./play-speech.component.css']
})
export class PlaySpeechComponent implements OnInit {

  private audio: any;
  private interval: any;
  recordingTime: number;
  consumerParams: ConsumerParams;

  constructor(private modalService: DialogModalService, private shareService: ShareService,
    private route: ActivatedRoute, private router: Router) {
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  ngOnInit(): void {
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }

    this.audio = new Audio();
    // this.audio.src = '../../../assets/media/eisenbahn_temporary.wav';
    this.audio.src = '../../../assets/media/final_audio.mp3';
    this.audio.onended = () => {
      this.audio.pause();
      clearInterval(this.interval);
      this.recordingTime = 0;
      // console.log(this.recordingTime);
    };
    this.audio.onplaying = () => {
      // this.recordingTime = 0;
      // console.log(this.recordingTime);
      this.recordingTime = 0;
      this.startTimeOut();
    };
    this.audio.load();
  }

  playSpeech(): void {
    if (this.isPlaying()) { return; }
   
    this.audio.play();
    // setTimeout(() => {
    // }, 3000);
  }


  isPlaying(): boolean {
    // console.log(!this.audio.paused);
    return !this.audio.paused;
  }

  startTimeOut(): void {

    this.interval = setInterval(
      () => {
        console.log(this.recordingTime);
        if (this.recordingTime === 4 || !this.isPlaying()) {
          clearInterval(this.interval);
          this.recordingTime = 0;
        }
        else {
          this.recordingTime = this.recordingTime + 1;
        }
      },
      300
    );
  }

  navigateNext(): void {
    this.router.navigate(['practice-speech']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play-speech',
  templateUrl: './play-speech.component.html',
  styleUrls: ['./play-speech.component.css']
})
export class PlaySpeechComponent implements OnInit {

  private audio: any;
  private interval: any;
  recordingTime: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = '../../../assets/media/eisenbahn_temporary.wav';
  }

  playSpeech(): void {
    if (this.isPlaying()) { return; }
    this.audio.load();
    this.audio.play();
    this.recordingTime = 0;
    this.startTimeOut();

  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  startTimeOut(): void {

    this.interval = setInterval(
      () => {
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

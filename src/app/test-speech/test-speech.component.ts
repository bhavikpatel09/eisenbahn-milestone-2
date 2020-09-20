import { Component, OnInit } from '@angular/core';
import { IWindow } from './windows-interface';
import * as moment from 'moment';

@Component({
  selector: 'app-test-speech',
  templateUrl: './test-speech.component.html',
  styleUrls: ['./test-speech.component.css']
})
export class TestSpeechComponent implements OnInit {
  recognition: any;
  isActive = false;
  isSupported = false;
  speechBtnText = 'PRESS TO SPEECH';
  textTo = '';
  time: any;

  private interval: any;
  private startTime: any;

  constructor() { }

  ngOnInit(): void {

    const { webkitSpeechRecognition }: IWindow = window as any;
    if ('webkitSpeechRecognition' in window) {
      this.isSupported = true;
    }
    else {

    }
    if (this.isSupported) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'de-DE';
      this.recognition.continious = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        
        let voice = null;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          this.recognition.stop();
          const transcript = event.results[i][0].transcript;
          voice = transcript;
        }

        if (voice === 'eisenbahn' || voice === 'Eisenbahn') {
          this.textTo = 'Congrats!!! You are eligible for the voucher!!!';
        }
        else {
          this.textTo = 'Recorded word: ' + voice;
        }
        //this.recordSpeech();
      };
      this.recognition.onstart = () => {
        this.textTo = '';
      };
      // this.recognition.onresult = (event) { };
      this.recognition.onerror = (event) => {
        const error = event.error;
        this.textTo = error;
      };
      this.recognition.onend = () => {
        if (this.startTime) {
          // const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          //this.recorded.next({ blob, title: mp3Name });
        }
      }
    }
    else {

    }
    //     const speechRecognition = Window['webkitSpeechRecognition'];

    //     const sr = $(window).get(0).webkitSpeechRecognition;

    // //     const {webkitSpeechRecognition} : IWindow = window as IWindow;
    // // const recognition = new webkitSpeechRecognition();


    //     this._supportRecognition = true;
    //     console.log(window['SpeechRecognition']);
    //     if (window['SpeechRecognition']) {
    //       this._speech = new SpeechRecognition();
    //     } else if (window['webkitSpeechRecognition']) {
    //       this._speech = new webkitSpeechRecognition();
    //     } else if(window['msSpeechRecognition']){
    //       this._speech = new msSpeechRecognition();
    //     } else {
    //       this._supportRecognition = false;
    //     }
    //     console.log(`Speech supported: ${this._supportRecognition}`);

  }

  private stopMedia(): void {
    // if (this.recorder) {
    //   this.recorder = null;
    clearInterval(this.interval);
    this.startTime = null;
    // if (this.stream) {
    //   this.stream.getAudioTracks().forEach(track => track.stop());
    //   this.stream = null;
    // }
  }

  recordSpeech(): void {
    if (this.isActive) {
      this.recognition.stop();
      this.isActive = false;
      this.speechBtnText = 'PRESS TO SPEECH';
    }
    else {
      this.isActive = true;
      this.recognition.start();
      this.startTime = moment();
      this.interval = setInterval(
        () => {
          const currentTime = moment();
          const diffTime = moment.duration(currentTime.diff(this.startTime));
          this.time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
          // this.recordingTime.next(time);
        },
        1000
      );

      this.speechBtnText = 'SHOW SPEECH!';
    }
  }
  private toString(value: any): any {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

}


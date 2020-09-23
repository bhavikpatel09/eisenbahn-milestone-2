import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { AskNameComponent } from './ask-name/ask-name.component';
import { AskRestaurantDetailsComponent } from './ask-restaurant-details/ask-restaurant-details.component';
import { AskCpfNumberComponent } from './ask-cpf-number/ask-cpf-number.component';
import { PracticeSpeechComponent } from './practice-speech/practice-speech.component';
import { ReadySpeechComponent } from './ready-speech/ready-speech.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';

import { HttpClientModule } from '@angular/common/http';
import { RecordRtcComponent } from './record-rtc/record-rtc.component';
import { TestSpeechComponent } from './test-speech/test-speech.component';
import { PlaySpeechComponent } from './play-speech/play-speech.component';
import { LongPressDirective } from './directives/long-press.directive';
import { BeersDetailsComponent } from './beers-details/beers-details.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvalidSpeechComponent } from './invalid-speech/invalid-speech.component';
import { ReparticipateComponent } from './reparticipate/reparticipate.component';
import { InvalidCpfComponent } from './invalid-cpf/invalid-cpf.component';
import { UnusedVoucherComponent } from './unused-voucher/unused-voucher.component';
import { VoucherAvailableComponent } from './voucher-available/voucher-available.component';
import { VoucherErrorComponent } from './voucher-error/voucher-error.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaskDirective } from './directives/mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    AgeGateComponent,
    AskNameComponent,
    AskRestaurantDetailsComponent,
    AskCpfNumberComponent,
    PracticeSpeechComponent,
    ReadySpeechComponent,
    VoucherDetailsComponent,
    RecordRtcComponent,
    TestSpeechComponent,
    PlaySpeechComponent,
    LongPressDirective,
    BeersDetailsComponent,
    DialogModalComponent,
    InvalidSpeechComponent,
    ReparticipateComponent,
    InvalidCpfComponent,
    UnusedVoucherComponent,
    VoucherAvailableComponent,
    VoucherErrorComponent,
    VideoPlayerComponent,
    VideoModalComponent,
    MaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

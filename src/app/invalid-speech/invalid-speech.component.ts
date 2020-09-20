import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-invalid-speech',
  templateUrl: './invalid-speech.component.html',
  styleUrls: ['./invalid-speech.component.css']
})
export class InvalidSpeechComponent implements OnInit {

  voucherNumber: string; //= 'INCV02102';  
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;

  constructor(private route: ActivatedRoute, private router: Router,
    private shareService: ShareService) { }

  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => this.consumerParams = consumerParams);
    // this.shareService.voucherDetails.subscribe(voucherDetails => {
    //   this.voucherDetails = voucherDetails;
    //   this.voucherNumber = this.voucherDetails?.codigo;
    // });
    this.consumerParams = this.shareService.getConsumerParams();
    this.voucherDetails = this.shareService.getVoucherDetails();
    this.voucherNumber = this.voucherDetails?.codigo;
  }

  navigateNext(): void {
    this.router.navigate(['beers-details'], { queryParams: { prevRoute: 'invalid-speech' } });
  }
}

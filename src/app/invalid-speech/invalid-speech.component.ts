import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { MyMaskUtil } from '../models/mask-utils';
import { VoucherDetails } from '../models/voucher-details';
import { DialogModalService } from '../services/dialog-modal.service';
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
  cpfNumber: string;
  cpfNumberMasked: string;
  name: string;

  constructor(private modalService: DialogModalService, private route: ActivatedRoute, private router: Router,
    private shareService: ShareService) { }

  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => this.consumerParams = consumerParams);
    // this.shareService.voucherDetails.subscribe(voucherDetails => {
    //   this.voucherDetails = voucherDetails;
    //   this.voucherNumber = this.voucherDetails?.codigo;
    // });
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
    this.cpfNumber = this.consumerParams?.consumer?.documento;
    this.cpfNumberMasked = MyMaskUtil.cpfNumberMask(this.cpfNumber);
    this.name = this.consumerParams?.consumer?.nome;

    this.voucherDetails = this.shareService.getVoucherDetails();
    this.voucherNumber = this.voucherDetails?.codigo;
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  navigateNext(): void {
    this.router.navigate(['beers-details'], { queryParams: { prevRoute: 'invalid-speech' } });
  }
}

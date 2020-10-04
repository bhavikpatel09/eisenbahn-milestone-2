import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-reparticipate',
  templateUrl: './reparticipate.component.html',
  styleUrls: ['./reparticipate.component.css']
})
export class ReparticipateComponent implements OnInit {

  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;
  cpfNumber: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService,
    private shareService: ShareService,
    private modalService: DialogModalService) {
    // this.shareService.consumerParams.subscribe(consumerParams => {
    //   this.consumerParams = consumerParams;
    //   this.cpfNumber = this.consumerParams?.consumer?.documento;
    // });
    // this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);

    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
    if (this.consumerParams && this.consumerParams.consumer) {
      this.cpfNumber = this.consumerParams?.consumer?.documento;
    }
    this.voucherDetails = this.shareService.getVoucherDetails();
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  ngOnInit(): void {
  }
  navigateNext(): void {
    this.router.navigate(['beers-details'], { queryParams: { prevRoute: 'reparticipate' } });
  }
}

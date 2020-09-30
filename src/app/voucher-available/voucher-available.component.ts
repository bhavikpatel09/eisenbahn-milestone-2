import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-voucher-available',
  templateUrl: './voucher-available.component.html',
  styleUrls: ['./voucher-available.component.css']
})
export class VoucherAvailableComponent implements OnInit {
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;

  cpfNumber: string; //= '153.143.324.21';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService,private modalService: DialogModalService,
    private shareService: ShareService) {
      if (!this.shareService.getPolicyAccepted()) {
        this.modalService.open('politica-dialog-accept');
      }
     }

  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => {
    //   this.consumerParams = consumerParams;
    //   if (this.consumerParams && this.consumerParams.consumer) {
    //     this.cpfNumber = this.consumerParams?.consumer?.documento;
    //   }
    // });
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams && this.consumerParams.consumer) {
      this.cpfNumber = this.consumerParams?.consumer?.documento;
    }
    // this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);
    this.voucherDetails = this.shareService.getVoucherDetails();
  }
  navigateNext(): void {
    this.router.navigate(['voucher-details']);
  }
}

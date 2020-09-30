import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-invalid-cpf',
  templateUrl: './invalid-cpf.component.html',
  styleUrls: ['./invalid-cpf.component.css']
})
export class InvalidCpfComponent implements OnInit {
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;

  cpfNumber: string;
  constructor(private modalService: DialogModalService,
    private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService,
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
    this.voucherDetails = this.shareService.getVoucherDetails();
    // this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);

  }
  navigateBack(): void {
    this.router.navigate(['ask-cpf-number']);
  }
}

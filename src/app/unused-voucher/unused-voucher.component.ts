import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-unused-voucher',
  templateUrl: './unused-voucher.component.html',
  styleUrls: ['./unused-voucher.component.css']
})
export class UnusedVoucherComponent implements OnInit {

  consumerParams: ConsumerParams;

  constructor(
    private modalService: DialogModalService, private shareService: ShareService, private router: Router) {
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  ngOnInit(): void {
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
  }

}

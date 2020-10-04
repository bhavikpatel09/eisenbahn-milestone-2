import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-voucher-error',
  templateUrl: './voucher-error.component.html',
  styleUrls: ['./voucher-error.component.css']
})
export class VoucherErrorComponent implements OnInit {

  consumerParams: ConsumerParams;

  errorMessage = 'Verifique a conexão da internet';
  constructor(private router: Router, private route: ActivatedRoute,
    private modalService: DialogModalService, private shareService: ShareService) {
    this.route.queryParams.subscribe(params => {
      if (params['errorMessage'] !== '' && params['errorMessage'] !== undefined) {
        this.errorMessage = params['errorMessage'];
      }
    });
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
  navigateBack(): void {
    this.router.navigate(['ready-speech']);
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { MyMaskUtil } from '../models/mask-utils';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-no-vouchers-available',
  templateUrl: './no-vouchers-available.component.html',
  styleUrls: ['./no-vouchers-available.component.css']
})
export class NoVouchersAvailableComponent implements OnInit {
  @ViewChild("myElem") MyProp: ElementRef;
  //voucherNumber: string; //= 'VCR232023';  
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;
  cpfNumber: string;
  cpfNumberMasked: string;
  name: string;

  constructor(private modalService: DialogModalService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router,
    private shareService: ShareService,
    private consumerService: ConsumerService) {
      if (!this.shareService.getPolicyAccepted()) {
        this.modalService.open('politica-dialog-accept');
      }
  }

  ngOnInit(): void {
    this.consumerParams = this.shareService.getConsumerParams();
    if (this.consumerParams?.isAgeGatePassed !== true) {
      this.router.navigate(['age-gate']);
    }
    this.cpfNumber = this.consumerParams?.consumer?.documento;
    this.name = this.consumerParams?.consumer?.nome;
    this.voucherDetails = this.shareService.getVoucherDetails();
    //this.voucherNumber = this.voucherDetails?.codigo;

    // this.cpfNumber = "12345678911";

    this.cpfNumberMasked = MyMaskUtil.cpfNumberMask(this.cpfNumber);
  }
  scrollToElement(): void {
    // console.log($element);
    // $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  navigateNext(): void {
    this.router.navigate(['beers-details'], { queryParams: { prevRoute: 'no-voucher-available' } });
  }
}

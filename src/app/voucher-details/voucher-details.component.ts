import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {
  @ViewChild("myElem") MyProp: ElementRef;
  voucherNumber: string; //= 'VCR232023';  
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;

  constructor(private route: ActivatedRoute, private router: Router,
    private consumerService: ConsumerService,
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

  scrollToElement(): void {
    // console.log($element);
    // $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  navigateNext(): void {
    this.router.navigate(['beers-details'], { queryParams: { prevRoute: 'voucher-details' } });
  }

}

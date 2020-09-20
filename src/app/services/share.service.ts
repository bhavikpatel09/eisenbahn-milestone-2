import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConsumerParams } from '../models/consumer-params';
import { VoucherDetails } from '../models/voucher-details';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private consumerSource = new BehaviorSubject(null);
  private voucherSource = new BehaviorSubject(null);
  //consumerParams = this.consumerSource.asObservable();
  //voucherDetails = this.voucherSource.asObservable();

  constructor() { }

  setConsumerParams(consumerParams: ConsumerParams): void {
    sessionStorage.setItem('consumerParams', JSON.stringify(consumerParams));
    this.consumerSource.next(this.getConsumerParams());
  }

  getConsumerParams(): ConsumerParams {
    return JSON.parse(sessionStorage.getItem('consumerParams'));
  }
  setVoucherDetails(voucherDetails: VoucherDetails): void {
    sessionStorage.setItem('voucherDetails', JSON.stringify(voucherDetails));
    this.voucherSource.next(this.getVoucherDetails());
  }
  getVoucherDetails(): VoucherDetails {
    return JSON.parse(sessionStorage.getItem('voucherDetails'));
  }
}

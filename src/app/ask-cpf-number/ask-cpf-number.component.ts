import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../models/city';
import { Consumer } from '../models/consumer';
import { ConsumerParams } from '../models/consumer-params';
import { MyMaskUtil } from '../models/mask-utils';
import { VoucherDetails, VOUCHERSTATUS } from '../models/voucher-details';
import { ConsumerService } from '../services/consumer.service';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-ask-cpf-number',
  templateUrl: './ask-cpf-number.component.html',
  styleUrls: ['./ask-cpf-number.component.css']
})
export class AskCpfNumberComponent implements OnInit {
  consumerParams: ConsumerParams;
  voucherDetails: VoucherDetails;
  public cpfMask = MyMaskUtil.CPF_MASK_GENERATOR;
  // public phoneValue01 = "12345678999";


  cpfNumber: string;
  constructor(private modalService: DialogModalService,
    private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService,
    private shareService: ShareService) { }

  ngOnInit(): void {
    //this.shareService.getConsumerParams();//.subscribe(consumerParams => {
    this.consumerParams = this.shareService.getConsumerParams();
    this.cpfNumber = this.consumerParams?.consumer?.documento;
    console.log("in CPF");
    console.log(this.consumerParams);
    //});
    //this.shareService.voucherDetails.subscribe(voucherDetails => this.voucherDetails = voucherDetails);
    this.voucherDetails = this.shareService.getVoucherDetails();
  }

  navigateNext(): void {
    // debugger;
    // const val = this.cpfNumber;
    // const valMas = this.cpfMask;
    // if (this.cpfNumber === '111.111.111.11') {
    //   this.router.navigate(['ask-restaurant-details']);
    //   return;
    // }
    // else {
    //   this.router.navigate(['invalid-cpf']);
    //   return;
    // }
    this.consumerService.validateConsumer(this.cpfNumber).subscribe(result => {
      if (result) { //200 (Obs.: Means that the document is valid and found the last used voucher.)
        if (result.success && result.success === true) {
          if (result.data) {
            const resultData = result.data;
            const voucherStatus = resultData.status;
            this.consumerParams = {
              consumer: {
                id: this.consumerParams?.consumer?.id,
                nome: this.consumerParams?.consumer?.nome,
                documento: this.cpfNumber
              },
              city: this.consumerParams?.city,
              restaurant: this.consumerParams?.restaurant,
              consumerVoucherDetails: {
                id: resultData.id,
                codigo: resultData.codigo,
                data_cadastro: resultData.data_cadastro,
                data_ativacao: resultData.data_ativacao,
                data_utilizacao: resultData.data_utilizacao,
                status: resultData.status,
                cliente: resultData.cliente,
                consumidor: resultData.consumidor
              }
            };
            this.shareService.setConsumerParams(this.consumerParams);

            this.voucherDetails = {
              id: resultData.id,
              codigo: resultData.codigo,
              data_cadastro: resultData.data_cadastro,
              data_ativacao: resultData.data_ativacao,
              data_utilizacao: resultData.data_utilizacao,
              status: resultData.status,
              cliente: resultData.cliente,
              consumidor: resultData.consumidor
            };
            this.shareService.setVoucherDetails(this.voucherDetails);
            //redirect to voucher details page
            if (voucherStatus === VOUCHERSTATUS.utilized) {
              this.router.navigate(['reparticipate']);
            }
            else {
              this.router.navigate(['voucher-available']);
            }
          }
        }
      }
    }, (response) => {
      if (response) {
        const errorResponse = response.error;
        // if (errorResponse.status === 400) {
        //   this.consumerParams = {
        //     consumer: {
        //       id: this.consumerParams.consumer.id,
        //       nome: this.consumerParams.consumer.nome,
        //       documento: this.cpfNumber
        //     },
        //     city: this.consumerParams.city,
        //     restaurant: this.consumerParams.restaurant,
        //     consumerVoucherDetails: this.consumerParams.consumerVoucherDetails
        //   };
        //   this.shareService.setConsumerParams(this.consumerParams);
        //   this.router.navigate(['ask-restaurant-details']);
        // }
        // else 
        if (errorResponse.status === 204) {
          //(Obs.: Means that the document is valid but not found any voucher used/generated, keep the normal flow.)
          this.consumerParams = {
            consumer: {
              id: this.consumerParams?.consumer?.id,
              nome: this.consumerParams?.consumer?.nome,
              documento: this.cpfNumber
            },
            city: this.consumerParams?.city,
            restaurant: this.consumerParams?.restaurant,
            consumerVoucherDetails: this.consumerParams?.consumerVoucherDetails
          };
          this.shareService.setConsumerParams(this.consumerParams);
          this.router.navigate(['ask-restaurant-details']);
        }
        else if (errorResponse.status === 500) { //(Obs.: Means that the document is invalid)
          this.consumerParams = {
            consumer: {
              id: this.consumerParams?.consumer?.id,
              nome: this.consumerParams?.consumer?.nome,
              documento: this.cpfNumber
            },
            city: this.consumerParams?.city,
            restaurant: this.consumerParams?.restaurant,
            consumerVoucherDetails: this.consumerParams?.consumerVoucherDetails
          };

          this.shareService.setConsumerParams(this.consumerParams);

          this.router.navigate(['invalid-cpf']);
        }
      }
    });
  }
  valid(): boolean {
    let isValid = false;
    if (this.cpfNumber && this.cpfNumber !== '') {
      isValid = true;
    }
    return isValid;
  }
}

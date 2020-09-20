import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumerParams } from '../models/consumer-params';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-ask-name',
  templateUrl: './ask-name.component.html',
  styleUrls: ['./ask-name.component.css']
})
export class AskNameComponent implements OnInit {
  name: string;
  consumerParams: ConsumerParams;

  constructor(private route: ActivatedRoute, private router: Router,
    private shareService: ShareService) { }

  ngOnInit(): void {
    // this.shareService.consumerParams.subscribe(consumerParams => {
    //   this.consumerParams = consumerParams;
    //   console.log(this.consumerParams);
    // });
    this.consumerParams = this.shareService.getConsumerParams();
  }
  navigateNext(): void {
    this.consumerParams = {
      consumer: {
        //id: this.consumerParams?.consumer?.id,
        nome: this.name//this.consumerParams?.consumer?.nome,
      }
    };
    this.shareService.setConsumerParams(this.consumerParams);

    this.router.navigate(['ask-cpf-number']);
  }

  valid(): boolean {
    let isValid = false;
    if (this.name && this.name !== '') {
      isValid = true;
    }
    return isValid;
  }
}

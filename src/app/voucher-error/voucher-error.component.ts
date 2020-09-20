import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voucher-error',
  templateUrl: './voucher-error.component.html',
  styleUrls: ['./voucher-error.component.css']
})
export class VoucherErrorComponent implements OnInit {

  errorMessage = 'Verifique a conexão da internet';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['errorMessage'] !== '' && params['errorMessage'] !== undefined) {
        this.errorMessage = params['errorMessage'];
      }
    });
  }
  ngOnInit(): void {
  }
  navigateBack(): void {
    this.router.navigate(['ready-speech']);
  }

}

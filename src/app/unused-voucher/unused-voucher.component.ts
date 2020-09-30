import { Component, OnInit } from '@angular/core';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-unused-voucher',
  templateUrl: './unused-voucher.component.html',
  styleUrls: ['./unused-voucher.component.css']
})
export class UnusedVoucherComponent implements OnInit {

  constructor(
    private modalService: DialogModalService, private shareService: ShareService) {
    if (!this.shareService.getPolicyAccepted()) {
      this.modalService.open('politica-dialog-accept');
    }
  }

  ngOnInit(): void {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModalService } from '../services/dialog-modal.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-age-gate',
  templateUrl: './age-gate.component.html',
  styleUrls: ['./age-gate.component.css']
})
export class AgeGateComponent implements OnInit, OnDestroy {
  showErrorMessage = false;
  constructor(private modalService: DialogModalService, private route: ActivatedRoute,
    private router: Router, private shareService: ShareService) {
    sessionStorage.clear();
    if (!this.shareService.getPolicyAccepted()) {
      this.openModal('politica-dialog-accept');
    }
  }

  //checkboxPolicy = false;
  //isError = false;

  ngOnDestroy(): void {
    this.closeModal('politica-dialog');
    this.closeModal('politica-dialog-accept');
  }

  ngOnInit(): void {

  }

  navigateNext(): void {
    //if (this.checkboxPolicy) {
    this.router.navigate(['ask-name']);
    // }
    // else {
    //   this.isError = true;
    // }

  }

  // checkPolicyEvent(): void {
  //   console.log(this.checkboxPolicy);
  //   if (this.checkboxPolicy) {
  //     this.isError = false;
  //   }
  // }

  not18YearOld(): void {
    this.showErrorMessage = true;
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}

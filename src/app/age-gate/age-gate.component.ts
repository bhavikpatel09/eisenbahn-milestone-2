import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModalService } from '../services/dialog-modal.service';

@Component({
  selector: 'app-age-gate',
  templateUrl: './age-gate.component.html',
  styleUrls: ['./age-gate.component.css']
})
export class AgeGateComponent implements OnInit, OnDestroy {
  showErrorMessage = false;
  constructor(private modalService: DialogModalService, private route: ActivatedRoute, private router: Router) { }
  ngOnDestroy(): void {
    this.closeModal('politica-dialog');
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  navigateNext(): void {
    this.router.navigate(['ask-name']);
  }

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

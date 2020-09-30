import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DialogModalService } from '../services/dialog-modal.service';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {

  @Input() title: string;
  @Input() acceptpolicy = false;
  @Input() id: string;
  private element: any;

  @ViewChild('backDropDiv') backDropDiv: ElementRef;

  constructor(private modalService: DialogModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    let backDropDivElem = document.getElementById("backDropDiv");
    if (backDropDivElem && !this.acceptpolicy) {
      backDropDivElem.className = 'modal-backdrop fade show'; //["modal-backdrop","fade","show"]
    }
    //this.element.classList.add('modal fade show');
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    //modal-backdrop fade show
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    let backDropDivElem = document.getElementById("backDropDiv");
    if (backDropDivElem) {
      backDropDivElem.className = ''; //["modal-backdrop","fade","show"]
    }
  }

}

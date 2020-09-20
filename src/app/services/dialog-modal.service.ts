import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor() { }

  private modals: any[] = [];

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    if (this.modals && this.modals.length > 0) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      if (modal) {
        modal.close();
      }
    }
    else {
      document.body.classList.remove('modal-open');
      let backDropDivElem = document.getElementById("backDropDiv");
      if (backDropDivElem) {
        backDropDivElem.className = ''; //["modal-backdrop","fade","show"]
      }
    }
  }

}

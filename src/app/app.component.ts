import { Component } from '@angular/core';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { fader, slider, transformer, stepper } from './route-animations';
import { DialogModalService } from './services/dialog-modal.service';
import { ShareService } from './services/share.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider]
})
export class AppComponent {
  title = 'eisenbahn-app';

  constructor(private modalService: DialogModalService, private route: ActivatedRoute,
    private router: Router, private shareService: ShareService) {
    // if (!this.shareService.getPolicyAccepted()) {
    //   this.openModal('politica-dialog-accept');
    // }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }
  acceptAndClose(): void {
    this.shareService.setPolicyAccepted();
    this.modalService.close('politica-dialog-accept');
  }
}

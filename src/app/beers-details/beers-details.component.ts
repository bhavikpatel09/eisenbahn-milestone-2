import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DialogModalService } from '../services/dialog-modal.service';

@Component({
  selector: 'app-beers-details',
  templateUrl: './beers-details.component.html',
  styleUrls: ['./beers-details.component.css']
})
export class BeersDetailsComponent implements OnInit, OnDestroy {
  safeURL: any;
  videoLink: string;
  @Input() showBack: boolean = true;
  prevRoute: string;

  constructor(private _sanitizer: DomSanitizer,
    private modalService: DialogModalService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.prevRoute = params['prevRoute'];
    });
  }

  ngOnDestroy(): void {
    this.modalService.close('video-player');
  }

  ngOnInit(): void {
  }

  openVideoLink(link: string): void {
    //window.location.href = link;
    this.videoLink = link;
    this.openModal('video-player');
    // window.open(link); //, "_blank"
  }

  navigateBack(): void {
    this.router.navigate([this.prevRoute]);
  }

  openModal(id: string): void {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoLink);
    this.modalService.open(id);
  }

  closingModal(event: any): void {
    if (event === 'video-player') {
      this.safeURL = undefined;
    }
  }
  // closeModal(id: string): void {
  //   this.modalService.close(id);
  // }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersDetailsComponent } from './beers-details.component';

describe('BeersDetailsComponent', () => {
  let component: BeersDetailsComponent;
  let fixture: ComponentFixture<BeersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

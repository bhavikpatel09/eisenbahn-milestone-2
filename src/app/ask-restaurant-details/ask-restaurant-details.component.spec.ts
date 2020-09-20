import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskRestaurantDetailsComponent } from './ask-restaurant-details.component';

describe('AskRestaurantDetailsComponent', () => {
  let component: AskRestaurantDetailsComponent;
  let fixture: ComponentFixture<AskRestaurantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskRestaurantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskRestaurantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemModalComponent } from './food-item-modal.component';

describe('EditFoodItemModalComponent', () => {
  let component: FoodItemModalComponent;
  let fixture: ComponentFixture<FoodItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

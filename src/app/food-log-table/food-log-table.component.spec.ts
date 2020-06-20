import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodLogTableComponent } from './food-log-table.component';

describe('FoodLogTableComponent', () => {
  let component: FoodLogTableComponent;
  let fixture: ComponentFixture<FoodLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

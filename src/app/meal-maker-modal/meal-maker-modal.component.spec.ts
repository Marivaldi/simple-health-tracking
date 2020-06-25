import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealMakerModalComponent } from './meal-maker-modal.component';

describe('MealMakerModalComponent', () => {
  let component: MealMakerModalComponent;
  let fixture: ComponentFixture<MealMakerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealMakerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealMakerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

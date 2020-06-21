import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedDayComponent } from './tracked-day.component';

describe('TrackedDayComponent', () => {
  let component: TrackedDayComponent;
  let fixture: ComponentFixture<TrackedDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackedDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

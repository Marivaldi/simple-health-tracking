import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingJournalComponent } from './tracking-journal.component';

describe('TrackingJournalComponent', () => {
  let component: TrackingJournalComponent;
  let fixture: ComponentFixture<TrackingJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTrackerBadgeComponent } from './status-tracker-badge.component';

describe('StatusTrackerBadgeComponent', () => {
  let component: StatusTrackerBadgeComponent;
  let fixture: ComponentFixture<StatusTrackerBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusTrackerBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTrackerBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

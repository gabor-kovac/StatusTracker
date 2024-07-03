import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemtestSummaryComponent } from './systemtest-summary.component';

describe('SystemtestSummaryComponent', () => {
  let component: SystemtestSummaryComponent;
  let fixture: ComponentFixture<SystemtestSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemtestSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemtestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CompatibilitiesService } from './compatibilities.service';

describe('CompatibilitiesService', () => {
  let service: CompatibilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompatibilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

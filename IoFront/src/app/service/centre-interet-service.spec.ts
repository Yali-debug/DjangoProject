import { TestBed } from '@angular/core/testing';

import { centreInteretService } from './centre-interet-service';

describe('InteretService', () => {
  let service: centreInteretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(centreInteretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

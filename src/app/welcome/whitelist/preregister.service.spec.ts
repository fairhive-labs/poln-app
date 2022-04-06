import { TestBed } from '@angular/core/testing';

import { PreregisterService } from './preregister.service';

describe('PreregisterService', () => {
  let service: PreregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PreregisterService } from './preregister.service';

describe('PreregisterService', () => {
  let service: PreregisterService;

  beforeEach(() => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    
    service = TestBed.inject(PreregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PreregisterService, RegisterResponse, ActivateResponse } from './preregister.service';

describe('PreregisterService', () => {
  let service: PreregisterService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(PreregisterService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain a valid url', () => {
    expect(service.url).toBeTruthy();
  });

  it('can POST to register endpoint', () => {
    const url = service.url;
    const testData: RegisterResponse = { hash: 'h4Sh' };
    const user = {
      email: 'jsie@trendev.fr',
      address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      type: 'mentor'
    };

    service.register(user.address, user.email, user.type)
      .subscribe(r => expect(r).toEqual(testData));

    const req = httpTestingController.expectOne(`${url}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('can POST to activate endpoint', () => {
    const url = service.url;
    const token = 't0k3N';
    const hash = 'h4Sh';
    const testData: ActivateResponse = { token: token, activated: true };

    service.activate(token, hash).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/activate/${token}/${hash}`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
});

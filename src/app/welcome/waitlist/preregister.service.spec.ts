import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PreregisterService, RegisterResponse, ActivateResponse } from './preregister.service';

describe('PreregisterService', () => {
  let service: PreregisterService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  const sponsor = '0xE3C3691DB5f5185F37A3f98e5ec76403B2d10c3E';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpClient);
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

  it('can http POST to register endpoint', () => {
    const url = service.url;
    const testData: RegisterResponse = { hash: 'h4Sh' };
    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    http.post<RegisterResponse>(`${url}/`, {
      address: address,
      email: email,
      type: type,
      sponsor: sponsor
    }).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('should fail register invalid user (invalid address)', () => {
    const url = service.url;
    const email = 'jsie@trendev.fr';
    const address = '0x';
    const type = 'mentor';
    const err = { error: 'bad address' }

    http.post<RegisterResponse>(`${url}/`, {
      address: address,
      email: email,
      type: type,
      sponsor: sponsor
    }).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(400);
        expect(error.error).withContext('message').toEqual(err);
      },
    });
    const req = httpTestingController.expectOne(`${url}/`);
    req.flush(err, { status: 400, statusText: 'Bad Request' });

  });

  it('can call register endpoint', () => {
    const url = service.url;
    const testData: RegisterResponse = { hash: 'h4Sh' };
    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    service.register(address, email, type, sponsor).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('can http POST to activate endpoint', () => {
    const url = service.url;
    const token = 't0k3N';
    const hash = 'h4Sh';
    const testData: ActivateResponse = {
      address: "0xeth_address_01",
      email: "john.doe@gmail.com",
      uuid: "uu1d",
      timestamp: 1684253919,
      type: "talent",
      sponsor: sponsor,
    };

    http.post<ActivateResponse>(`${url}/activate/${token}/${hash}`, null).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/activate/${token}/${hash}`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('can call activate endpoint', () => {
    const url = service.url;
    const token = 't0k3N';
    const hash = 'h4Sh';
    const testData: ActivateResponse = {
      address: "0xeth_address_01",
      email: "john.doe@gmail.com",
      uuid: "uu1d",
      timestamp: 1684253919,
      type: "talent",
      sponsor: sponsor,
    };

    service.activate(token, hash).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/activate/${token}/${hash}`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  readonly url = "https://polar-plains-98105.herokuapp.com";

  constructor(private http: HttpClient) { }

  register(address: string, email: string, type: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/`, {
      address: address,
      email: email,
      type: type,
    })
      .pipe(
        retry(3)
      );
  }

  activate(token: string, hash: string) {
    return this.http.post<ActivateResponse>(`${this.url}/activate/${token}/${hash}`, null)
      .pipe(
        retry(3)
      );
  }
}

export interface RegisterResponse {
  hash: string;
}

export interface ActivateResponse {
  activated: boolean;
  token: string;
}

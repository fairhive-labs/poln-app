import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  private url = "https://polar-plains-98105.herokuapp.com/";

  constructor(private http: HttpClient) { }

  register(address: string, email: string, utype: string) {
    console.log('POST /');
    return of({ hash: "H45h" });
  }

  activate(token: string, hash: string) {
    console.log(`POST /activate/${token}/${hash}`);
    return of({ token: "t0k3N", activated: true });
  }
}

export interface RegisterResponse {
  hash: string;
}

export interface ActivateResponse {
  activated: boolean;
  token: string;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  readonly url = environment.preregisterURL;
  readonly HASH_KEY = btoa('poln_landing_page_registration_hash');

  constructor(private http: HttpClient) { }

  register(address: string, email: string, type: string, sponsor: string) {

    return this.http.post<RegisterResponse>(`${this.url}/register`, {
      address: address.trim(),
      email: email.trim(),
      type: type.trim(),
      sponsor: sponsor.trim()
    })
      .pipe(
        retry(3)
      );
  }

  activate(token: string, hash: string) {
    return this.http.post<ActivateResponse>(`${this.url}/activate/${token.trim()}/${hash.trim()}`, null)
      .pipe(
        retry(3)
      );
  }

  // @TODO : control return value + unit test
  count(path1: string, path2: string) {
    return this.http.get<CountResponse>(`${this.url}/${path1}/${path2}/count?mime=json
    `)
      .pipe(retry(3));
  }

  saveHash(hash: string) {
    localStorage.setItem(this.HASH_KEY, hash);
  }

  loadHash(): string | null {
    return localStorage.getItem(this.HASH_KEY);
  }

  clearHash() {
    return localStorage.removeItem(this.HASH_KEY);
  }

  getListEndpointURL(path1: string, path2: string) {
    return `${this.url}/${path1}/${path2}/list?mime=csv`;
  }
}

export interface RegisterResponse {
  hash: string;
}

export interface ActivateResponse {
  address: string;
  email: string;
  uuid: string;
  timestamp: number;
  type: string;
  sponsor: string;
}

export interface CountResponse {
  total: number;
  users: UsersMap
}

export interface UsersMap {
  advisor: number;
  agent: number;
  initiator: number;
  contributor: number;
  investor: number;
  mentor: number;
  contractor: number;
}
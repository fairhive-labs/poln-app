import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  readonly url = "https://polar-plains-98105.herokuapp.com";
  readonly HASH_KEY = btoa('fairhive_landing_page_registration_hash');

  constructor(private http: HttpClient) { }

  register(address: string, email: string, type: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/register`, {
      address: address.trim(),
      email: email.trim(),
      type: type.trim(),
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

  // @TODO : unit test
  count(path1: string, path2: string) {
    return this.http.get<CountResponse>(`${this.url}/${path1}/${path2}/count?mime=json
    `)
      .pipe(
        retry(3)
      );
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
  activated: boolean;
  token: string;
}

export interface CountResponse {
  total: number;
  users: UsersMap
}

export interface UsersMap {
  advisor: number;
  agent: number;
  client: number;
  contributor: number;
  investor: number;
  mentor: number;
  talent: number;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  url = "http://preregister.fairhive.io"
  constructor(private http: HttpClient) { }

  register(address: string, email: string, utype: string) { }

  activate(token: string, hash: string) { }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreregisterService {

  private url = "https://polar-plains-98105.herokuapp.com/";

  constructor(private http: HttpClient) { }

  register(user: User): Observable<RegisterResponse | ErrorResponse> {
    return this.http.post<RegisterResponse | ErrorResponse>(`${this.url}`, user).pipe(
      retry(3),
      catchError(err => this.handleError(err, {}))
    );
  }

  activate(token: string, hash: string) {
    console.log(`POST /activate/${token}/${hash}`);
    return of({ token: "t0k3N", activated: true });
  }

  private handleError(error: HttpErrorResponse, data: any) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return of(data);
  }
}

export interface ErrorResponse {
  error: string;
}

export interface RegisterResponse {
  hash: string;
}

export interface ActivateResponse {
  activated: boolean;
  token: string;
}

export interface User {
  address: string;
  email: string;
  type: string;
}
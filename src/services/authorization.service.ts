import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError, endWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userHasLoggedIn$: Subject<boolean> = new Subject<boolean>();
  private readonly base_service_url: string = "https://72mtzp9aq7.execute-api.us-east-1.amazonaws.com";
  private readonly mode: string = "dev";
  private readonly login_endpoint: string = "login";
  private readonly me_endpoint: string = "me";
  private readonly register_endpoint: string = "register";
  private readonly token_key: string = "s1XH5lyqj0qjesd2";
  constructor(private http: HttpClient) { }


  private get headersDict() {
    return {
      'Content-Type': 'application/json'
    }
  }

  private get headersDictWithToken() {
    return {
      'Content-Type': 'application/json',
      Authorization: this.getToken()
    }
  }

  userHasLoggedIn(): Observable<boolean> {
    const userInfo = localStorage.getItem(this.token_key);
    if (!userInfo) return new Observable<boolean>((subscriber) => subscriber.next(false));

    return this.tokenStillValid();
  }

  tokenStillValid(): Observable<boolean> {
    const me_url = `${this.base_service_url}/${this.mode}/${this.me_endpoint}`;
    return this.http.get<any>(me_url, { headers: this.headersDictWithToken }).pipe(
      switchMap((auth) => {
        return new Observable<boolean>((subscriber) => subscriber.next(true));
      }),
      catchError((err) => {
        return new Observable<boolean>((subscriber) => subscriber.next(false));
      })
    );
  }

  getToken(): string {
    const userInfo = JSON.parse(localStorage.getItem(this.token_key));
    if (!userInfo) return null;

    return userInfo.token;
  }

  getUsername(): string {
    const userInfo = JSON.parse(localStorage.getItem(this.token_key));
    if (!userInfo) return null;

    return userInfo.username;
  }

  login(username: string, password: string): Observable<boolean> {
    const login_url = `${this.base_service_url}/${this.mode}/${this.login_endpoint}`;
    return this.http.post<any>(login_url, { username: username, password: password }, { headers: this.headersDict }).pipe(
      switchMap((auth) => {
        const userInfo = JSON.stringify({username: username, token: auth.token })
        localStorage.setItem(this.token_key, userInfo);
        this.userHasLoggedIn$.next(true);
        return new Observable<boolean>((subscriber) => subscriber.next(true));
      }),
      catchError((err) => {
        this.userHasLoggedIn$.next(false);
        return new Observable<boolean>((subscriber) => subscriber.next(false));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.token_key);
    this.userHasLoggedIn$.next(false);
  }
}

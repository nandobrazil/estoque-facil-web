import {Injectable} from '@angular/core';
import {StorageKeys} from "../constants/storage-key";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {jwtDecode} from "jwt-decode";

interface TokenPayload {
  sub: number;
  email: string;
  administrator: boolean;
  exp: number;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  environment = environment;

  constructor(
    public http: HttpClient,
  ) {
  }


  async signIn(request: any): Promise<boolean> {
    const {
      success,
      data
    } = await lastValueFrom(this.http.post<IHttpResult<any>>(`${this.environment.apiUrl}/auth/login`, request));
    if (success) {
      this.saveToken(data!);
    }

    return success;
  }

  signOut() {
    this.clearTokens();
  }

  isLogged() {
    return !!this.getAccessToken();
  }

  getAccessToken() {
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  }

  saveToken(data: { access_token: string }) {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.access_token);
  }

  clearTokens() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  }

  getTokenPayload(): any {
    return this.getAccessToken() ? jwtDecode(this.getAccessToken()!) : undefined;
  }

}

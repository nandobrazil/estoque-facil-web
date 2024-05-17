import {Injectable} from '@angular/core';
import {StorageKeys} from "../constants/storage-key";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {jwtDecode} from "jwt-decode";
import {IAuthData, IAuthResponse} from "../interfaces/core/IAuthResponse";
import {MessageService} from "primeng/api";
import {IBasicUserInfo} from "../interfaces/IBasicUserInfo";

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
    private messageService: MessageService
  ) {
  }


  async signIn(request: any): Promise<boolean> {
      const {success, data} = await lastValueFrom(this.http.post<IHttpResult<IAuthResponse>>(`${this.environment.apiUrl}/auth/token`, request));
      if (success) {
        this.saveToken(data);
        return true;
      }
      this.clearTokens();
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Usuário ou senha informados incorretos'
      });
      return false;
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

  saveToken(data: any) {
    if (data?.token === undefined || data?.refreshToken === undefined) {
      return;
    }
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.token);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(StorageKeys.USERNAME, data.username);
    localStorage.setItem(StorageKeys.FULL_NAME, data.name);
    localStorage.setItem(StorageKeys.EMAIL, data.email);
  }

  clearTokens() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(StorageKeys.USERNAME);
    localStorage.removeItem(StorageKeys.FULL_NAME);
    localStorage.removeItem(StorageKeys.EMAIL);
  }

  getTokenPayload(): any {
    const token = this.getAccessToken();
    return token ? jwtDecode(token) : undefined;
  }

  async refresh() {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        const {data, success} = await lastValueFrom(this.http.get<any>(
          `${this.environment.apiUrl}/signin/refresh?refreshToken=${refreshToken}`
        ));
        success ? this.saveToken(data) : this.clearTokens();
        return success;
      }
    } catch (err) {
      console.log(err)
    }
    this.clearTokens();
    return false;
  }

  getRefreshToken() {
    return localStorage.getItem(StorageKeys.REFRESH_TOKEN);
  }

  isAdmin(): boolean {
    return this.getTokenPayload()?.authorities?.some((role: string) => role === 'ROLE_ADMIN');
  }

  getBasicUserInfo(): IBasicUserInfo {
    return {
      fullname: localStorage.getItem(StorageKeys.FULL_NAME) || '',
      email: localStorage.getItem(StorageKeys.EMAIL) || '',
      role: this.isAdmin() ? 'Administrador' : 'Vendedor',
      token: localStorage.getItem(StorageKeys.ACCESS_TOKEN) || '',
      refreshToken: localStorage.getItem(StorageKeys.REFRESH_TOKEN) || ''
    }
  }

}

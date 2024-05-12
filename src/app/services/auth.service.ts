import { Injectable } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) {
  }

  async login(username: string, password: string) {
    //je vais attendre jusqu'a ce que je recois la reponse
    let user: any = await firstValueFrom(this.http.get("http://localhost:8089/" + username));
    //FirstValueFrom :fct predefinie permet
    // tant de pasrser un observable en promesse
    if (password == btoa(password)) {  //cette partie ce fait dans le backend
      let decodedJwt = jwtDecode(user.token);
      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedJwt.sub,
        //roles: decodedJwt.roles,
        token: user.token,
      })
      return Promise.resolve(true);
    } else {
      return Promise.reject("Invalid credentials");
    }

  }
}


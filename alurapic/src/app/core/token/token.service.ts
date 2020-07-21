import { Injectable } from '@angular/core';

const key = 'authToken';

@Injectable({ providedIn: 'root'})
export class TokenService{

    hasToken(): boolean {
        return !!window.localStorage.getItem(key);
    }

    setToken(token) {
        window.localStorage.setItem(key, token);
    } 

    getToken() {
        return window.localStorage.getItem(key);
    }

    removeToken() {
        window.localStorage.removeItem(key);
    }
}
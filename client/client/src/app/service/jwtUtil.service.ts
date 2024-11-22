import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JWTService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public getRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.localStorage.getItem('accessToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        (decodedToken);
        return decodedToken.roles[0] || ""; // Adjust according to your JWT structure
      } else {
        ('No access token found!');
      }
    } else {
      ('Not running in the browser environment.');
    }
    return "";
  }
}
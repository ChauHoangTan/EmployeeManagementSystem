import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if(typeof window !== null){
        const token = localStorage.getItem('accessToken'); // Lấy token từ Local Storage (hoặc nơi bạn lưu trữ)
      
        if (token && !this.isTokenExpired(token)) {
          return true; // Nếu token hợp lệ, cho phép truy cập
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Chuyển về login
          return false;
        }
      }
    }

    return false
    
  }

  // Hàm kiểm tra token hết hạn (ví dụ cơ bản, có thể tùy chỉnh theo cấu trúc token của bạn)
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode phần payload của JWT
      return payload.exp * 1000 < Date.now(); // So sánh thời gian hết hạn
    } catch (error) {
      return true; // Nếu parse token thất bại, coi như hết hạn
    }
  }
}

import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
        canActivate: [AuthGuard]
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details page',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page'
    },
    { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent,
        title: 'Forgot password'
    },
    { 
        path: '**', 
        redirectTo: '/login' 
    },
];


import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthResponse } from '../../model/authResponse';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
    standalone: true,
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.sass',
    imports: [
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MatIcon
    ]
})

export class LoginComponent{
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    public authService: AuthService = inject(AuthService)
    
    username: string 
    password: string 

    isHidePassword: boolean

    public isError: boolean
    constructor(private router: Router) { 
        this.username = ""
        this.password = ""
        this.isError = false
        this.isHidePassword = true
    }

    public handleLogin = async() => {
        const authResponse: AuthResponse = await this.authService.login(this.username, this.password)

        if(authResponse.status === 200){
            localStorage.setItem('accessToken', authResponse.token)
            this.router.navigate(['/'])
        }else{
            this.isError = true
        }
    }

    public handleHidePassword = () => {
        this.isHidePassword = !this.isHidePassword
    }

    

}
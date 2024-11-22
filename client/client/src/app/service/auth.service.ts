import { Injectable } from "@angular/core";
import axios from "axios";
import { Position } from "../model/position";
import axiosClient from "../api/axiosClient";
import { AuthResponse } from "../model/authResponse";
import { Router } from '@angular/router';
import { ChangePasswordReponse } from "../model/changePasswordResponse";

@Injectable({
    providedIn: 'root'
})


export class AuthService{
    url = '/authenticate'
    
    
    public constructor(private router: Router){
        
    }

    public async login(username: string, password: string): Promise<AuthResponse>{
        try {
            const response = await axiosClient.post(this.url + '/login', {
                username, password
            })
            const data: string = response.data
            return {
                status: response.status,
                token: data
            }
        } catch (error) {
            console.log(error)
            return {
                status: 401,
                token: ""
            }
        }
        
    }

    public handleLogout = () => {
        localStorage.removeItem('accessToken')
        this.router.navigate(['/login'])
    }

    public verifyAccountByUsernameOrEmail = async(username: string): Promise<ChangePasswordReponse> => {
        try {
            const response = await axiosClient.post(this.url + '/forgot-password/verify-username', {
                username
            })
            return{
                status: response.status,
                message: response.data
            }
        } catch (error) {
            console.log(error)
            return {
                status: 401,
                message: "Network error!"
            }
        }
    }

    public verifyCode = async(username: string, code: string): Promise<ChangePasswordReponse> => {
        try {
            const response = await axiosClient.post(this.url + '/forgot-password/verify-code', {
                username, code
            })
            return{
                status: response.status,
                message: response.data
            }
        } catch (error) {
            return {
                status: 401,
                message: 'Network error!'
            }
        }
    }

    public changeNewPassword = async(username: string, password: string): Promise<ChangePasswordReponse> => {
        try {
            const response = await axiosClient.post(this.url + '/forgot-password/change-new-password', {
                username, password
            })
            return{
                status: response.status,
                message: response.data
            }
        } catch (error) {
            return {
                status: 401,
                message: 'Network error!'
            }
        }
    }
}
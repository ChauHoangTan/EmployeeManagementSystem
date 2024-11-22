import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormControl, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { ChangePasswordReponse } from '../../model/changePasswordResponse';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent {

  private authService: AuthService = inject(AuthService)

  username: string
  isErrorUsername: boolean
  errorUsername: string

  code: string
  isErrorCode: boolean
  errorCode: string

  newPassword: string
  retypeNewPassword: string
  errorPassword: string 

  isErrorPasswordFormat: boolean
  isErrorRetypePassword: boolean

  isHidePassword: boolean

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  public constructor(){
    this.username = ""
    this.isErrorUsername = false
    this.errorUsername = ""

    this.code = ""
    this.isErrorCode = false
    this.errorCode = ""

    this.newPassword = ""
    this.isErrorPasswordFormat = false
    this.errorPassword = ""

    this.retypeNewPassword = ""
    this.isErrorRetypePassword = false

    this.isHidePassword = true
  }

  public handleVerifyUsername = async (stepper: MatStepper) => {
    if(this.username === ""){
      this.isErrorUsername = true
        this.errorUsername = "Username must not be empty!"
    }else{
      const response: ChangePasswordReponse = await this.authService.verifyAccountByUsernameOrEmail(this.username)
      if(response.status !== 200){
        this.isErrorUsername = true
        this.errorUsername = response.message
      }else{
        this.isErrorUsername = false
        stepper.next()
      }
    }
  }

  public handleVerifyCode = async (stepper: MatStepper) => {
    if(this.code === ""){
      this.isErrorCode = true
        this.errorCode = "Code must not be empty!"
    }else{
      const response = await this.authService.verifyCode(this.username, this.code)
      if(response.status !== 200){
        this.isErrorCode = true
        this.errorCode = response.message
      }else{
        this.isErrorCode = false
        stepper.next()
      }
    }
  }

  public handleChangePassword = async (stepper: MatStepper) => {
    if(this.newPassword === ""){
      this.isErrorPasswordFormat = true
        this.errorPassword= "Password must not be empty"
    }
    else if(this.newPassword !== this.retypeNewPassword){
      this.isErrorRetypePassword = true
    }else{
      this.isErrorRetypePassword = false
      const response = await this.authService.changeNewPassword(this.username, this.newPassword)
      if(response.status !== 200){
        this.isErrorPasswordFormat = true
        this.errorPassword= response.message
      }else{
        this.isErrorPasswordFormat = false
        stepper.next()
      }
    }
    
  }

  public handleHidePassword = () => {
    this.isHidePassword = !this.isHidePassword
}

}

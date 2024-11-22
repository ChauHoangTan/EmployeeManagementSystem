import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Employee } from './model/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { EmployeeService } from './service/employee.service';
import { Position } from './model/position';
import { PositionService } from './service/position.service';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from './service/auth.service';
import { JWTService } from './service/jwtUtil.service';
import { ThemeModeComponent } from './components/theme-mode/theme-mode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    MatIconModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatDialogModule, 
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    ThemeModeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'client';

  public authService: AuthService = inject(AuthService)
  public jwtService: JWTService = inject(JWTService)


  readonly dialog = inject(MatDialog);

  public constructor(){
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public handleLogout = () => {
    this.authService.handleLogout()
  }
}
@Component({
  selector: 'dialog-component',
  templateUrl: './components/dialog/dialog.component.html',
  styleUrl:'./details/details.component.sass',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  employeeService: EmployeeService = inject(EmployeeService)
  positionService: PositionService = inject(PositionService)
  
  newEmployee : Employee = this.employeeService.emptyEmployee()

  positionList: Position[] = []

  selectedPosition: number = 1

  public constructor(){
    this.loadPositions()
  }

  private loadPositions = async () => {
    const response = await this.positionService.getAllPosition()
    this.positionList = response
    console.log(this.positionList)
  }

  public async onClickCreateButton(){
    await this.employeeService.add(this.newEmployee)
    console.log(this.newEmployee)
  }

  public onClickCancleButton(){

  }

  public changeSelectPosition(event: any) {
    this.newEmployee.position.id = this.selectedPosition
    // Thực hiện hành động khi thay đổi, ví dụ gọi API hoặc cập nhật dữ liệu
  }
}

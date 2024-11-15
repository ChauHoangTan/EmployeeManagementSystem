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
    FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'client';

  readonly dialog = inject(MatDialog);

  openCreateDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  employeeService: EmployeeService = inject(EmployeeService)
  newEmployee : Employee = this.employeeService.emptyEmployee()
  public async onClickCreateButton(){
    await this.employeeService.add(this.newEmployee)
    console.log(this.newEmployee)
  }

  public onClickCancleButton(){

  }
}

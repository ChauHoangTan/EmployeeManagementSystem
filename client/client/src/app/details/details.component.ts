import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { EmployeeService } from "../service/employee.service";
import { ActivatedRoute } from "@angular/router";
import { Employee } from "../model/employee";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'details-component',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.sass"]
})
export class DetailsComponent{

    route: ActivatedRoute = inject(ActivatedRoute)
    employeeService: EmployeeService = inject(EmployeeService)
    employeeId = parseInt(this.route.snapshot.params['id'], 10)
    employee: Employee = this.employeeService.emptyEmployee()

    public editable: boolean = false
    constructor(){
        this.employeeService.getById(this.employeeId).then((employee: Employee) => {
            this.employee = employee
            console.log(this.employee)
        })
    }

    public async editOnClickButton(){
        if(this.editable){
            console.log(this.employee)
            await this.employeeService.update(this.employee)
        }
        this.editable = !this.editable
    }

    public async deleteOnClickButton(){
        await this.employeeService.delete(this.employeeId)
    }
}
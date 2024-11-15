import { CommonModule } from "@angular/common";
import { Component, inject, Inject } from "@angular/core";
import { Employee } from "../model/employee";
import { EmployeeService } from "../service/employee.service";
import { EmployeeComponent } from "../components/employee/employee.component";

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [
        CommonModule,
        EmployeeComponent
    ],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.sass"]
})
export class HomeComponent {

    employeeService : EmployeeService = inject(EmployeeService)
    employeeList: Employee[] = []
    constructor() {
        this.employeeService.getAll().then((employeeList: Employee[]) => {
            this.employeeList = employeeList;
            console.log(this.employeeList)
        })
    }
}
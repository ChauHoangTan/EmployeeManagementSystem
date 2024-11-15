import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Employee } from "../model/employee";

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [
        CommonModule
    ],
    template: "./home.component.html",
    styles: ['./home.component.sass']
})
export class HomeComponent {

    private employeeList: Employee[] = []
    constructor() {
        
    }
}
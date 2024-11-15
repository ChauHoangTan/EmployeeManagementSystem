import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'employee-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, CommonModule, MatIcon, MatListModule, RouterModule],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.sass'
})

export class EmployeeComponent {

    @Input() employee!: Employee

    constructor() { }

    public navigateToDetails(id: number){

    }

}
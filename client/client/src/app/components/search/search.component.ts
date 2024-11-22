import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Page } from '../../model/page';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee';


interface SortBy{
    value: string,
    viewValue: string
}

interface SortDirection{
    value: string,
    viewValue: string
}

@Component({
    selector: 'search-comp',
    standalone: true,
    imports: [
        MatIcon,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatButton
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.sass'
})

export class SearchComponent {

    // @Input() executeSearchFunction!: (employeeList: Employee[], totalPages: number) => void
    @Input() executeSearchFunction!: (keyword: string, sortBy: string, sortDirection: string) => void

    searchValue: string

    sortDirection: SortDirection[]

    sortBy: SortBy[]
    selectedSortBy: string
    selectedSortDirection: string

    employeeService: EmployeeService = inject(EmployeeService)

    constructor() {
        this.searchValue = ""
        this.sortDirection = [
            {
                value: "ascending",
                viewValue:"Ascending"
            },
            {
                value:"descending",
                viewValue:"Descending"
            }
        ]

        this.sortBy = [
            {
                value: "id",
                viewValue:"ID"
            },
            {
                value: "name",
                viewValue:"Name"
            },
            {
                value:"email",
                viewValue:"Email"
            },
            {
                value: "phoneNumber",
                viewValue:"Phone Number"
            }
        ]
        
        this.selectedSortBy = "id"
        this.selectedSortDirection = "ascending"
    }

    public searchAndSort(){
        this.executeSearchFunction(this.searchValue, this.selectedSortBy, this.selectedSortDirection)
    }

}
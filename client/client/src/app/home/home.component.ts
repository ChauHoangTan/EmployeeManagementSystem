import { CommonModule } from "@angular/common";
import { Component, inject, Inject, ChangeDetectorRef  } from "@angular/core";
import { Employee } from "../model/employee";
import { EmployeeService } from "../service/employee.service";
import { EmployeeComponent } from "../components/employee/employee.component";
import { Page } from "../model/page";
import { SearchComponent } from "../components/search/search.component";
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from "../components/paginator/paginator.component"; 

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [
    CommonModule,
    EmployeeComponent,
    SearchComponent,
    MatPaginatorModule,
    PaginatorComponent
],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.sass"]
})
export class HomeComponent {

    employeeService : EmployeeService = inject(EmployeeService)
    employeeList: Employee[] = []
    totalPages: number = 0
    currentPage: number = 0
    limit: number = 2

    keyword: string = ""
    selectedSortBy: string = "id"
    selectedSortDirection: string = "ascending"
    // Inject ChangeDetectorRef vào constructor
    constructor(private cdr: ChangeDetectorRef) {
        this.loadEmployees(); // Load employees khi khởi tạo
    }

    // Phương thức loadEmployees
    private async loadEmployees() {
        try {
            const page: Page = await this.employeeService.getAll(this.currentPage, this.limit);
            this.employeeList = [...page.content];  // Cập nhật lại employeeList
            this.totalPages = page.totalPages;     // Cập nhật số trang
            (page)
        } catch (error) {
            console.error('Failed to load employees:', error);
        }
    }

    public trackByEmployeeId(index: number, employee: Employee): number | string {
        return employee.id ? employee.id : employee.email; // Thay id bằng thuộc tính duy nhất của mỗi employee
    }

    public search = async (keyword: string, sortBy: string, sortDirection: string) => {
        const response: Page = await this.employeeService.search(keyword, sortBy, sortDirection, this.currentPage, this.limit)
        this.keyword = keyword
        this.selectedSortBy = sortBy
        this.selectedSortDirection = sortDirection
        this.employeeList = response.content
        this.totalPages = response.totalPages
        this.cdr.detectChanges(); 
    }

    public changePage = async () => {
        const response: Page = await this.employeeService.search(this.keyword, this.selectedSortBy, 
            this.selectedSortDirection, this.currentPage, this.limit)
        this.employeeList = response.content
        this.totalPages = response.totalPages
        this.cdr.detectChanges(); 
    }

    public nextPage = () => {
        this.currentPage += 1
        this.changePage()
    }

    public prePage = () => {
        this.currentPage -= 1
        this.changePage()
    }

    public changePageSize = (pageSize: number) => {
        this.limit = pageSize
        this.changePage()
    }
}
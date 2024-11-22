import { Injectable } from "@angular/core";
import { Employee } from "../model/employee";
import axios from "axios";
import { Page } from "../model/page";
import { Observable } from "rxjs";
import axiosClient from "../api/axiosClient";
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    url = '/employees';

    public async getAll(page: number, limit: number): Promise<Page>{
        const response = await axiosClient.get(this.url, {
            params: {
                page, limit
            }
        })
        const data: Page = response.data
        return data ?? null
    }

    public async search(keyword: string, sortBy: string, sortDirection: string, page: number, limit: number): Promise<Page>{
        const response = await axiosClient.get(this.url + '/search', {
            params: {
                keyword, page, limit, sortBy, sortDirection
            }
        }
        )
        const data: Page = response.data
        
        return data
    }

    public async getById(id: number): Promise<Employee>{
        const response = await axiosClient.get(this.url + `/${id}`)
        const data: Employee = response.data
        return data ?? null
    }

    public async add(employee: Employee): Promise<string>{
        const response = await axiosClient.post(this.url, employee)
        const data: string = response.data
        return data ?? ''
    }

    public async update(employee: Employee): Promise<string>{
        const response = await axiosClient.put(this.url, employee)
        const data: string = response.data
        return data ?? ''
    }

    public async delete(id: number): Promise<string>{
        const response = await axiosClient.delete(this.url + `/${id}`)
        const data: string = response.data
        return data ?? ''
    }

    

    public emptyEmployee(): Employee{
        return {
            name: '',
            position: {
              position: '',
              id: 1
            },
            homeAddress: {
              city: '',
              district: '',
              ward: '',
              street: '',
            },
            companyAddress: {
              city: '',
              district: '',
              ward: '',
              street: ''
            },
            phoneNumber: '',
            email: ''
          }
    }
}
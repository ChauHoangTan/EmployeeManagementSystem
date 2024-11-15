import { Injectable } from "@angular/core";
import { Employee } from "../model/employee";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    url = 'http://localhost:8080/employees';

    public async getAll(): Promise<Employee[]>{
        const response = await axios.get(this.url)
        const data: Employee[] = response.data
        return data ?? []
    }

    public async getById(id: number): Promise<Employee>{
        const response = await axios.get(this.url + `/${id}`)
        const data: Employee = response.data
        return data ?? null
    }

    public async add(employee: Employee): Promise<String>{
        const response = await axios.post(this.url, employee)
        const data: String = response.data
        return data ?? ''
    }

    public async update(employee: Employee): Promise<String>{
        const response = await axios.put(this.url, employee)
        const data: String = response.data
        return data ?? ''
    }

    public async delete(id: number): Promise<String>{
        const response = await axios.delete(this.url + `/${id}`)
        const data: String = response.data
        return data ?? ''
    }

    public emptyEmployee(): Employee{
        return {
            name: '',
            position: {
              position: ''
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
import { Injectable } from "@angular/core";
import { Employee } from "../model/employee";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    url = 'http://localhost:8080/employees';

    async getAll(): Promise<Employee[]>{
        const data: Employee[] = await axios.get(this.url)
        return data ?? []
    }

    async getById(id: number): Promise<Employee>{
        const data: Employee = await axios.get(this.url + `/${id}`)
        return data ?? null
    }

    async add(employee: Employee): Promise<String>{
        const data: String = await axios.post(this.url, employee)
        return data ?? ''
    }

    async update(employee: Employee): Promise<String>{
        const data: String = await axios.put(this.url, employee)
        return data ?? ''
    }

    async delete(id: number): Promise<String>{
        const data: String = await axios.delete(this.url + `/id`)
        return data ?? ''
    }
}
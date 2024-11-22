import { Employee } from "./employee";

export interface Page{
    size: number,
    totalPages: number,
    content: Employee[],
    pageable: {
        pageNumber: number,
        pageSize: number,
    }
}
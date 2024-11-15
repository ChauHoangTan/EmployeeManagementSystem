export interface Employee{
    id: number,
    name: string,
    address: {
        id: number,
        city: string,
        district: string,
        ward: string,
        street: string
    },
    addressCompany: {
        id: number,
        city: string,
        district: string,
        ward: string,
        street: string
    },
    phoneNumber: string
}
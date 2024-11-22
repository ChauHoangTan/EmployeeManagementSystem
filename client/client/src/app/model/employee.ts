import { Address } from "./address"
import { Position } from "./position"

export interface Employee{
    id?: number,
    name: string,
    position: Position
    homeAddress: Address,
    companyAddress: Address,
    phoneNumber: string,
    email: string
}
import { Injectable } from "@angular/core";
import axios from "axios";
import { Position } from "../model/position";


@Injectable({
    providedIn: 'root'
})
export class AddressService{
    url = 'http://localhost:8080/addresses';
    
    public constructor(){
        
    }

    public async getAllAdress(){
        const response = await axios.get(this.url)
        const data: Position = response.data
        return data
    }
}
import { Injectable } from "@angular/core";
import axios from "axios";
import { Position } from "../model/position";


@Injectable({
    providedIn: 'root'
})
export class PositionService{
    url = 'http://localhost:8080/positions';
    
    public constructor(){
        
    }

    public async getAllPosition(){
        const response = await axios.get(this.url)
        const data: Position = response.data
        return data
    }
}
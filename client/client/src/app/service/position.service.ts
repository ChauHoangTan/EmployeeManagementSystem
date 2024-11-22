import { Injectable } from "@angular/core";
import axios from "axios";
import { Position } from "../model/position";
import axiosClient from "../api/axiosClient";

@Injectable({
    providedIn: 'root'
})
export class PositionService{
    url = '/positions';
    
    public constructor(){
        
    }

    public async getAllPosition(): Promise<Position[]>{
        const response = await axiosClient.get(this.url)
        const data: Position[] = response.data
        return data
    }
}
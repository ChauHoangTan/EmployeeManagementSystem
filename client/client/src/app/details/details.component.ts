import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'details-component',
    standalone: true,
    imports: [
        CommonModule
    ],
    template: "./details.component.html",
    styles: ['./details.component.sass']
})
export class DetailsComponent{

    constructor(){

    }
}
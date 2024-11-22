import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
@Component({
    standalone: true,
    selector: 'theme-component',
    templateUrl: 'theme-mode.component.html',
    styleUrl: 'theme-mode.component.sass',
    imports: [
        MatSlideToggleModule,
        MatIconModule
    ]
})

export class ThemeModeComponent {
    public isLightMode: boolean

    public constructor(){
        this.isLightMode = true
    }

    public changeThemeMode = () => {
        this.isLightMode = !this.isLightMode
        const theme = this.isLightMode ? 'light-theme' : 'dark-theme';
        document.documentElement.setAttribute('theme', theme);
        // Thay đổi class trên body
        
    }
}
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ HeaderComponent ],
    imports: [
        CommonModule, 
        RouterModule,
    ],
    exports: [ HeaderComponent ]
})
export class CoreModule {

}
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { requestInterceptor } from './auth/request.interceptor';

@NgModule({
    declarations: [ HeaderComponent ],
    imports: [
        CommonModule, 
        RouterModule,
    ],
    exports: [ HeaderComponent ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: requestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {

}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import {HttpErrorInterceptor} from './interceptor/httperror.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecordListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

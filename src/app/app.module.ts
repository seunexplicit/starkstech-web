import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from './components/loader/loader.module';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedMaterialModule } from './shared-material.module';
import { ToDoModule } from './pages/to-do/to-do.module';
import { ToDoModule as ToDoChild } from './pages/to-do/to-do/to-do.module';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToDoChild,
    HttpClientModule,
    SharedMaterialModule,
    BrowserAnimationsModule,
    LoaderModule,
    TopBarModule,
    ToDoModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

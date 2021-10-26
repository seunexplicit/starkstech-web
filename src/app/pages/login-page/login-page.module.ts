import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { TopBarModule } from '../../components/top-bar/top-bar.module';
import { SharedMaterialModule } from '../../shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TopBarModule,
    SharedMaterialModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }

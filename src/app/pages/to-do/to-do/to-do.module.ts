import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { SharedMaterialModule } from '../../../shared-material.module';
import { SharedModule } from '../../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    
    ToDoRoutingModule
  ]
})
export class ToDoModule { }

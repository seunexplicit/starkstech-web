import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { SharedMaterialModule } from '../../shared-material.module';
import { TopBarModule } from '../../components/top-bar/top-bar.module';
import { ItemListModule } from '../../components/item-list/item-list.module';
import { SideNavModule } from '../../components/side-nav/side-nav.module';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    ToDoComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    TopBarModule,
    ToDoRoutingModule,
    SideNavModule,
    ItemListModule
  ]
})
export class ToDoModule { }

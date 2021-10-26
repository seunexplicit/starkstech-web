import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { SharedMaterialModule } from '../../shared-material.module';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule { }

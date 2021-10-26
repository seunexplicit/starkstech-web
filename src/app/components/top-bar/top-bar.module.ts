import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { SharedMaterialModule } from '../../shared-material.module';



@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule { }

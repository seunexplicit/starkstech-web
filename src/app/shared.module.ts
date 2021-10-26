import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColDirective } from './directives/col.directive';
import { RowDirective } from './directives/row.directive';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { AbsoluteDirective } from './directives/absolute.directive';



@NgModule({
  declarations: [
    ColDirective,
    RowDirective,
    ImageUrlPipe,
    AbsoluteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColDirective,
    AbsoluteDirective,
    RowDirective,
    ImageUrlPipe
  ]
})
export class SharedModule { }

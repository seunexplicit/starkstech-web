import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAbsolute]'
})
export class AbsoluteDirective implements AfterViewInit {

  constructor(private elem: ElementRef) { }

  ngAfterViewInit() {
    
    setTimeout(() => {
      (this.elem.nativeElement as HTMLElement).style.width = (this.elem.nativeElement as HTMLElement).parentElement.clientWidth + 'px';
      (this.elem.nativeElement as HTMLElement).style.height = (this.elem.nativeElement as HTMLElement).parentElement.clientHeight + 'px';
    }, 800)
  }

}

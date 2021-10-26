import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCol]',
})
export class ColDirective implements AfterViewInit, OnInit {

  @Input() size;

  constructor(
    private elem: ElementRef,
    private c: ChangeDetectorRef
  ) {


  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    try {

      //this._layoutManip();
      
      setTimeout(() => {
        this._layoutManip();
      }, 50)

    }
    catch (err) { }

  }

  _layoutManip() {
    const parentElement = (this.elem.nativeElement as HTMLElement).parentElement;
    const children = parentElement.children;
    /*const width = parentElement.clientWidth;
    const childrenCount = children.length;
    console.log(this.elem.nativeElement, width, parentElement);
    if (this.size) {
      (this.elem.nativeElement as HTMLElement).style.width = ((Number(this.size) / 12) * width) + 'px'
    }
    else {
      let totalSize = 0;
      let count = 0;
      for (let j = 0; j < childrenCount; j++) {
        let size = children[j].getAttribute('size');
        if (size) {
          count++;
          totalSize += Number(size)
        }
      }
      if (count) {
        const remWidth = width - ((totalSize / 12) * width);
        (this.elem.nativeElement as HTMLElement).style.width = (remWidth / (childrenCount - count)) + 'px';
      }
      else {
        (this.elem.nativeElement as HTMLElement).style.width = ((12 / childrenCount) * (width / 12)) + 'px';
      }

    }*/

    (this.elem.nativeElement as HTMLElement).style.padding = '5px';
  }
}

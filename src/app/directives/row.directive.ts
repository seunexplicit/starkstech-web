import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRow]'
})
export class RowDirective implements AfterViewInit {

  @Input() size;

  constructor(
    private elem: ElementRef
  ) {

  }

  ngAfterViewInit() {
    try {
      (this.elem.nativeElement as HTMLElement).style.display = 'flex';
      (this.elem.nativeElement as HTMLElement).style.justifyContent = 'space-around';
      (this.elem.nativeElement as HTMLElement).style.flexWrap = 'wrap';
      (this.elem.nativeElement as HTMLElement).style.width = '100%';
      let parentNodeCount = 0;
      let parent = (this.elem.nativeElement as HTMLElement);
      while (parent.parentElement) {
        if (parent.attributes.getNamedItem('approw') || parent.attributes.getNamedItem('appcol')) parentNodeCount++;
        parent = parent.parentElement;
      }
      setTimeout(() => {
        const children = (this.elem.nativeElement as HTMLElement).children;
        const parentWidth = (this.elem.nativeElement as HTMLElement).clientWidth;
        let totalSizedWidth = 0;
        let totalSized = 0;
        let totalSizeCount = 0; 
        for (let j = 0; j < children.length; j++) {
          let size = children[j].getAttribute('size');
          if (size && children[j].attributes.getNamedItem('appcol')) {
            (children.item(j) as HTMLElement).style.width = (((Number(size) / 12) * parentWidth) - 1) + 'px';
            totalSizedWidth += ((Number(size) / 12) * parentWidth);
            totalSized+=Number(size);
            totalSizeCount++
          }
        }
        for (let j = 0; j < children.length; j++) {
          let size = children[j].getAttribute('size');
          if (!size && children[j].attributes.getNamedItem('appcol')) {
            (children.item(j) as HTMLElement).style.width = (((parentWidth - totalSizedWidth) / (children.length - totalSizeCount)) - 1) + 'px';
          }
        }
      }, 30 * parentNodeCount);
    }
    catch (err) { }

  }

}

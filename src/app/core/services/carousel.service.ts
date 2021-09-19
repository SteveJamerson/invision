import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, Subscription } from 'rxjs';
import { delay, takeUntil, takeWhile} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  @ViewChild('carousel') carousel: ElementRef | undefined;

  childrens: HTMLElement[] = [];
  selected: number = 0;
  size: number = 0;
  offsetX: number = 0;
  indexStart: number = 0;
  indexFinish?: number;
  indexAuto: number = 0;
  auto?: any = true;

  constructor() { }

  init(target: ElementRef | undefined): void {

    this.childrens = [...[target?.nativeElement][0].children];
    this.size = this.childrens[0].scrollWidth;

    //mouse
    let mousedown = fromEvent(target?.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    //touch
    let touchstart = fromEvent(target?.nativeElement, 'touchstart');
    let touchmove = fromEvent(document, 'touchmove');
    let touchend = fromEvent(document, 'touchend');

    document.querySelectorAll('img').forEach(i => i.ondragstart = () => false);

    interval(5000)
      .pipe(
        takeWhile(() => {
          return true
        }),
      )
      .subscribe(()=> {
        if(
          this.auto
        ) {
          this.indexAuto >= this.childrens.length-1 ? this.indexAuto = 0 : this.indexAuto++;
          this.select(this.indexAuto)
        }
      })


    merge(mousedown, touchstart)
      .subscribe(
        (eventInit: any) => {
          this.offsetX = eventInit.screenX || eventInit.touches[0].screenX;
          this.indexStart = Math.round(eventInit.target.scrollLeft / this.size);

          merge(mousemove, touchmove)
            .pipe(
              takeUntil(mouseup || touchend),
              delay(50)
            )
            .subscribe(
              (eventMove: any) => {

                this.auto = false;

                let screenX = eventMove.screenX || eventMove.touches[0].screenX;

                let diference = this.offsetX - screenX;

                if(Math.abs(diference) < 20) return

                let moving = diference > 0 ? 1 : -1;

                this.indexFinish = this.indexAuto = this.indexStart + moving;

                if (this.indexFinish < 0) {
                  this.indexFinish = this.childrens.length-1;
                }
                if (this.indexFinish >= this.childrens.length) {
                  this.indexFinish = 0;
                }

                this.select(this.indexFinish)
              }
            )

        }
      )
  }

  select(index: number): void {
    this.childrens[+index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
    this.selected = index;
    this.auto = true;
  }

}

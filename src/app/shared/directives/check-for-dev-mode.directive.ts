import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCheckForDevMode]',
  standalone: true
})
export class CheckForDevModeDirective {

  constructor(private el: ElementRef,private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    let widthThreshold = window.outerWidth - window.innerWidth > 160;
    let heightThreshold = window.outerHeight - window.innerHeight > 160; 
    if (widthThreshold || heightThreshold) {
      alert('You Have Opened Developer tools.');
      this.el.nativeElement.innerHTML = '';
    } else {
      window.location.reload();
      alert('Thanks For Closing.');
    }
  }
}

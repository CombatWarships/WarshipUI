import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.style.small.css', './app.style.medium.css', './app.style.large.css']
})
export class AppComponent {

  title = 'Combat Warships';

  constructor(private el: ElementRef) {
  }

  onToggleNav(obj: any) {

  }
}

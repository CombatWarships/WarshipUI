import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.scss']
})
export class AppComponent {

  title = 'Combat Warships';

  constructor(private el: ElementRef) {
  }

  onToggleNav(obj: any) {

  }
}

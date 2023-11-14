import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.scss']
})
export class AppComponent {

  title = 'Combat Warships';

  GetLinkStyle(routeName:string) {
    if (this.router.isActive(routeName, false))
      return "nav-item active";
    return "nav-item";

  }

  constructor(private router: Router) {
  }
}

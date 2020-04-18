import {Component} from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(

    private appService: AppService

  ) {
  }

  home(){
    this.appService.routeNavigation(0);
  }

}

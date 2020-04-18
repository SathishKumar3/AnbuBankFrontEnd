import {Component, OnInit} from '@angular/core';
import {PageData} from "../page-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageData: PageData;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.routeNavigation(0);

  }

  newLoan() {
    this.appService.routeNavigation(1);
  }

  returnLoan() {
    this.appService.routeNavigation(2);
  }

  dailySheet() {
    this.appService.routeNavigation(3);
  }

  search(){
    this.appService.routeNavigation(4);
  }

}

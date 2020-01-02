import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageData} from "../page-data";
import {AppService} from "../app.service";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'dailysheet',
  templateUrl: './dailysheet.component.html',
  styleUrls: ['./dailysheet.component.scss']
})
export class DailysheetComponent implements OnInit {

  pageData: PageData;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.pageData = this.appService.getPageData(this.router.url);

  }

  get dateBound(): AbstractControl { return this.pageData.formGroup.get('dateBound'); }
}

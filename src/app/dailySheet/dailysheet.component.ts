import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageData} from "../page-data";
import {AppService} from "../app.service";
import {AbstractControl} from "@angular/forms";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'dailysheet',
  templateUrl: './dailysheet.component.html',
  styleUrls: ['./dailysheet.component.scss']
})
export class DailysheetComponent implements OnInit,AfterViewInit {

  pageData: PageData;
  returnColumns: string[] = ['loanNo','amount','interest'];
  returnDataSource = new MatTableDataSource();
  returnData: any;
  loanColumns: string[] = ['loanNo','amount','interest','appraiserFee'];
  loanDataSource = new MatTableDataSource();
  loanData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {
  }

  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.pageData = this.appService.getPageData(this.router.url);
    this.selectedDate.setValue(new Date());

    this.returnData = {
      "count": "58",
      "totalAmount": 150000,
      "totalInterest": 45000,
      "items": [
        {
          "loanNo": "1598",
          "amount": 15000,
          "interest": 5000

        },
        {
          "loanNo": "1257",
          "amount": 27500,
          "interest": 8475
        },
        {
          "loanNo": "1658",
          "amount": 1500,
          "interest": 0
        }
      ]
    }

    this.loanData = {
      "count": "65",
      "totalAmount": 250000,
      "totalInterest": 23000,
      "totalAppraiserFee": 2000,
      "items": [
        {
          "loanNo": "1598",
          "amount": 15000,
          "interest": 5000,
          "appraiserFee": 150
        },
        {
          "loanNo": "1257",
          "amount": 27500,
          "interest": 8475,
          "appraiserFee": 225
        },
        {
          "loanNo": "1658",
          "amount": 1500,
          "interest": 45,
          "appraiserFee": 15
        }
      ]
    }
      this.returnDataSource =  new MatTableDataSource(this.returnData.items);
      this.loanDataSource =  new MatTableDataSource(this.loanData.items);
    }



ngAfterViewInit() {
  this.returnDataSource.sort = this.sort;
  this.returnDataSource.paginator = this.paginator;
  this.loanDataSource.sort = this.sort;
  this.loanDataSource.paginator = this.paginator;
}

  validateDate(){
    
  }

  get selectedDate(): AbstractControl { return this.pageData.formGroup.get('selectedDate'); }
}

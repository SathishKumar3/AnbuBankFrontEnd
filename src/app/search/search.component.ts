import {Component, OnInit} from "@angular/core";
import {PageData} from "../page-data";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {TypeaheadService} from "../typeahead.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pageData: PageData;
  searchName: string;
  searchPlace: string;
  searchDataSource =  new MatTableDataSource();
  searchColumns : string[] = ['loanNo', 'amount','loanerName', 'items']


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private typeaheadService:TypeaheadService
  ) {
  }

  ngOnInit() {
    this.pageData = this.appService.getPageData(this.router.url);
    this.searchName = this.typeaheadService.typeaheadName();
    this.searchPlace = this.typeaheadService.typeaheadPlace();
  }

  validateDate(){
    console.log("");
  }

  search(){
    let results = [{
      "loanNo" : "1234",
      "amount" : "15000",
      "loanerName":"Sanmugam",
      "items" :"ring 2, struds 2, stone ring 2"
     },
      {
        "loanNo" : "2345",
        "amount" : "10000",
        "loanerName":"Arun",
        "items" :"ring 2"
      },
      {
        "loanNo" : "5421",
        "amount" : "6000",
        "loanerName":"Senthil",
        "items" :"Necklace 1"
      },
      {
        "loanNo" : "3452",
        "amount" : "4500",
        "loanerName":"Selvi",
        "items" :"Aaram 1"
      }
    ];

    this.searchDataSource =  new MatTableDataSource(results);

  }


  get loanNo() : AbstractControl { return this.pageData.formGroup.get('loanNo'); }
  get amount() : AbstractControl { return this.pageData.formGroup.get('amount'); }
  get fromDate() : AbstractControl { return this.pageData.formGroup.get('fromDate'); }
  get toDate() : AbstractControl { return this.pageData.formGroup.get('toDate'); }
  get loanerName() : AbstractControl { return this.pageData.formGroup.get('loanerName'); }
  get lastName() : AbstractControl { return this.pageData.formGroup.get('lastName'); }
  get place() : AbstractControl { return this.pageData.formGroup.get('place'); }
  get item() : AbstractControl { return this.pageData.formGroup.get('item'); }
  get isReturned() : AbstractControl { return this.pageData.formGroup.get('isReturned'); }

}

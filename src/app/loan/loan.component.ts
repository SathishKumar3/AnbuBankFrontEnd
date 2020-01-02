import {Component, OnInit} from '@angular/core';
import {PageData} from "../page-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {AbstractControl, FormBuilder} from "@angular/forms";


declare let $ : any;
console.log(`jQuery version: ${$.fn.jquery}`);

@Component({
  selector: 'home',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  pageData: PageData;
  interestRateOptions: number[] = [5,4,3,2.5,2];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.pageData = this.appService.getPageData(this.router.url);
  }

  cancel() {
    console.log("Cancel #@####");
    console.log(`jQuery version: ${$.fn.jquery}`);
    $('#confirmCancelModal').modal('show');

  }

  numberOnly(event): boolean {

    event.target.value = event.target.value.trim();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) ) {
      return false;
    } else if(event.target.value.length==0 && (charCode==48 || charCode==96))
    {
      return  false;
    }
    return true;
  }

  get amount(): AbstractControl { return this.pageData.formGroup.get('amount'); }

  get interestRate(): AbstractControl { return this.pageData.formGroup.get('interestRate'); }

  get name(): AbstractControl { return this.pageData.formGroup.get('name'); }

  get lastName(): AbstractControl { return this.pageData.formGroup.get('lastName'); }

  get phoneNo(): AbstractControl { return this.pageData.formGroup.get('phoneNo'); }

  get streetName(): AbstractControl { return this.pageData.formGroup.get('streetName'); }

  get place(): AbstractControl { return this.pageData.formGroup.get('place'); }

  get addressDesc(): AbstractControl { return this.pageData.formGroup.get('addressDesc'); }

  get itemDetails(): AbstractControl { return this.pageData.formGroup.get('itemDetails') ; }

  get itemDesc(): AbstractControl { return this.pageData.formGroup.get('itemDesc'); }

  get netWeight(): AbstractControl { return this.pageData.formGroup.get('netWeight'); }

}

import {ElementRef, Injectable} from "@angular/core";
import {PageData} from "./page-data";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService{


  private _pageData: PageData[] = [
    {
      route: '/home',
      formGroupName: 'homePageForm',
      formGroup: this.getHomeFormGroup()
    },
    {
      route: '/loan',
      formGroupName: 'loanForm',
      formGroup: this.getLoanFormGroup()
    },
    {
      route: '/return',
      formGroupName: 'returnForm',
      formGroup: this.getReturnFormGroup()
    },
    {
      route: '/dailySheet',
      formGroupName: 'dailySheetForm',
      formGroup: this.getDailySheetFormGroup()
    },
    {
      route: '/search',
      formGroupName: 'searchForm',
      formGroup: this.getSearchFormGroup()
    }
  ];

  getHomeFormGroup(): FormGroup {
    return this.fb.group({
    })
  }

  getDailySheetFormGroup(): FormGroup {
    return this.fb.group({
      selectedDate: ['']
    })
  }

  getSearchFormGroup(): FormGroup {
    return this.fb.group({
      loanNo: [''],
      amount:[''],
      fromDate:[''],
      toDate:[''],
      loanerName:[''],
      lastName:[''],
      place:[''],
      item:[''],
      isReturned:[false]
    })
  }

  getLoanFormGroup(): FormGroup {
    return this.fb.group({
      loanNo:[''],
      loanDate:['',Validators.required],
      amount: ['',Validators.required],
      interestRate: ['',Validators.required],
      name: ['',Validators.required],
      lastName:['',Validators.required],
      phoneNo: [''],
      streetName: ['',Validators.required],
      place: ['', Validators.required],
      addressDesc: [''],
      itemDetails: ['',Validators.required],
      netWeight: ['',Validators.required],
      itemDesc: [''],
      loanerImg:['',Validators.required]
    })
  }

  getReturnFormGroup(): FormGroup {
    return this.fb.group({
      loanNumbers: this.fb.array([
        this.fb.control('')
      ]),
      loanDetails: this.fb.array([
        this.fb.group({
          loanNo: [''],
          amount: [''],
          calculatedInterest: [''],
          receivedInterest: [''],
          totalAmt:['']
        })
      ]),

      rName:[''],
      rLastName:[''],
      rPhoneNo:[''],
      rPlace:[''],
      rStreetName:[''],
      rAddressDesc:[''],
    })

  }


  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }


  routeNavigation(url: number): any {
    this.router.navigate([this._pageData[url].route]);
  }


  /**
   * Retrieve the current pageData by the @url
   */
  getPageData(url: string): any {
    const pageDataFilter = this._pageData.filter(page => url === page.route);
    return pageDataFilter.length === 1 ? { ...pageDataFilter[0] } : null;
  }



  fieldValidation(el:ElementRef):void {
    const invalidElements = el.nativeElement.querySelectorAll('input.ng-invalid,select.ng-invalid,span.ng-invalid');
    if(invalidElements.length>0){
      invalidElements[0].scrollIntoView({behavior: "smooth"});
    }
  }


  /**
   * Takes a FormGroup/Array and recursively sets all its controls to dirty
   */
  markControlsTouched(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup || (abstractControl instanceof FormArray && abstractControl.length)) {
        this.markControlsTouched(abstractControl);
      } else {
        abstractControl.markAsTouched();
      }
    });
  }

  scrollToItem(element : Element) : void {
    element.scrollIntoView({behavior: "smooth"});
  }



}


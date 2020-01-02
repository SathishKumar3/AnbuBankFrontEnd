import {Injectable} from "@angular/core";
import {PageData} from "./page-data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      formGroup: this.getHomeFormGroup()
    }


  ];

  getHomeFormGroup(): FormGroup {
    return this.fb.group({
    })
  }

  getDailySheetFormGroup(): FormGroup {
    return this.fb.group({
      dateBound: ['']
    })
  }




  getLoanFormGroup(): FormGroup {
    return this.fb.group({
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
          receivedInterest: ['',Validators.required],
          totalAmt:[''],
          viewLink:['']
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



}


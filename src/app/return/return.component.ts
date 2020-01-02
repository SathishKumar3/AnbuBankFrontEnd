import {Component, OnInit} from '@angular/core';
import {PageData} from "../page-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {AbstractControl, FormArray, FormBuilder, Validators} from "@angular/forms";
import * as Handlebars from 'handlebars/dist/cjs/handlebars';


declare let $ : any;

@Component({
  selector: 'return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  pageData: PageData;
  totalAmount : number = 0;
  displayReturnerDeatils : boolean

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
) {
  }

  ngOnInit() {
    this.onChangeisLoaner(false);
    this.pageData = this.appService.getPageData(this.router.url);
    if (this.loanDetails.at(0)!== undefined && this.loanDetails.at(0).get('loanNo').value.length===0 ) {
      this.loanDetails.removeAt(0);
    }
  }

  addLoanNo(){
    this.loanNumbers.insert(0, this.fb.control('',Validators.required));
    this.loanNumbers.updateValueAndValidity();

  }


  removeInsured(index) {
    this.loanNumbers.removeAt(index);
  }


  removeLoanDetails(index) {
    this.loanDetails.removeAt(index);
    this.calculateTotalSum();
  }

  calculate(){
    const backEndData = [{
      "loanNo":"3",
      "amount":15000,
      "interestRate": 5,
      "appriserRate": 5,
      "monthInterest": 5,
      "loanDate" : "10/10/2019",
      "calculatedInterest":1000,
      "receivedInterest" : null,
      "name":"Samy",
      "lastName" : "Anbu",
      "item" :"ring 2"
    },
      {
        "loanNo":"33",
        "amount":25000,
        "calculatedInterest":2500,
        "receivedInterest" : null,
        "interestRate": 5,
        "appriserRate": 5,
        "monthInterest": 5,
        "loanDate" : "10/10/2019",
        "name":"Arumugam",
        "lastName" : "Sivanesan",
        "item" :"necklace 2"
      }
      ];

      const loanDetails = backEndData.map(data => {
        return this.fb.group({
          loanNo: data.loanNo,
          amount: data.amount,
          calculatedInterest: data.calculatedInterest,
          receivedInterest: null,
          totalAmt: data.amount + data.calculatedInterest,
          viewLink : data
        });
      });
      const loanDetailsArray: FormArray = this.fb.array(loanDetails);
      this.pageData.formGroup.setControl('loanDetails', loanDetailsArray);
    this.calculateTotalSum();
  }

  returnLoan() {
    console.log(this.pageData.formGroup.value);
  }

  viewLoan(val){

    let source = "Loan No : {{loanNo}}\n" +
      "Amount  : {{amount}}\n" +
      "Calculated Interest : {{calculatedInterest}}";

    let template = Handlebars.compile(source);

    $('#loanStuff').html(template(val));
    $("#viewModal").modal('show');

  }

  onChangeisLoaner(isChecked: boolean){
    if(isChecked){
      this.displayReturnerDeatils = false;
    }
    else{
      this.displayReturnerDeatils = true;
    }
  }

  interestPlusPrincipal(){
    for(let i=0; i< this.loanDetails.length;i++) {
      if(this.loanDetails.controls[i].get('receivedInterest').value){
        let sum = Number.parseInt(this.loanDetails.controls[i].get('amount').value) + Number.parseInt(this.loanDetails.controls[i].get('receivedInterest').value);
        this.loanDetails.controls[i].get('totalAmt').setValue(sum);
      }
      else{
        let sum = Number.parseInt(this.loanDetails.controls[i].get('amount').value) + Number.parseInt(this.loanDetails.controls[i].get('calculatedInterest').value);
        this.loanDetails.controls[i].get('totalAmt').setValue(sum);
      }
    }
    this.calculateTotalSum();

  }

  calculateTotalSum(){
    this.totalAmount = 0
    for(let i=0; i< this.loanDetails.length;i++) {
      this.totalAmount  =  this.totalAmount + this.loanDetails.controls[i].get('totalAmt').value
    }
  }



  get loanNumbers(): FormArray { return this.pageData.formGroup.get('loanNumbers') as FormArray; }
  get loanDetails(): FormArray { return this.pageData.formGroup.get('loanDetails') as FormArray; }
  get rName() : AbstractControl { return this.pageData.formGroup.get('rName'); }
  get rLastName() : AbstractControl { return this.pageData.formGroup.get('rLastName'); }
  get rPhoneNo() : AbstractControl { return this.pageData.formGroup.get('rPhoneNo'); }
  get rPlace() : AbstractControl { return this.pageData.formGroup.get('rPlace'); }
  get rStreetName() : AbstractControl { return this.pageData.formGroup.get('rStreetName'); }
  get rAddressDesc() : AbstractControl { return this.pageData.formGroup.get('rAddressDesc'); }

}

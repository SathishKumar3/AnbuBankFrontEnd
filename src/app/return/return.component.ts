import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  displayReturnerDeatils : boolean;

  @ViewChild("video",{static: false})
  video: ElementRef;

  @ViewChild("canvas",{static: false})
  canvas: ElementRef;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private renderer: Renderer2,
    private elm: ElementRef

) {
  }

  ngOnInit() {
    this.onChangeisLoaner(false);
    this.pageData = this.appService.getPageData(this.router.url);
    this.pageData.formGroup = this.appService.getReturnFormGroup();
    if (this.loanDetails.at(0)!== undefined && this.loanDetails.at(0).get('loanNo').value.length===0 ) {
      this.loanDetails.removeAt(0);
    }
  }


  addLoanNo(){
    let index = this.loanNumbers.length
    this.loanNumbers.insert(index+1, this.fb.control('',Validators.required));
    this.loanNumbers.updateValueAndValidity();

  }


  removeInsured(index) {
    if(this.loanNumbers.length > 1) {
      this.loanNumbers.removeAt(index);
    }
  }


  removeLoanDetails(index) {
    this.loanDetails.removeAt(index);
    this.calculateTotalSum();
  }


  startCamera() {
    if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(this.attachVideo.bind(this)).catch();
    } else {
      console.log('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    if(this.video) {
      this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
    }
  }

  capture() {
    let width = 150, height = 125;
    let xAdjust = width * .001;
    let  yAdjust = height * .001;

    this.renderer.setProperty(this.canvas.nativeElement, 'width', width);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', height);
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement,  0 - xAdjust, 0 - yAdjust, width,height);

    //this.returnerImg.setValue(this.canvas.nativeElement.toDataURL("image/jpeg"));

  }


  returnLoan(){


    for (let i = 0; i < this.loanDetails.length; i++) {
      this.loanDetails.controls[i].get('receivedInterest').setValidators([Validators.required]);
      this.loanDetails.controls[i].get('receivedInterest').updateValueAndValidity();
    }


    if(this.pageData.formGroup.valid) {
      console.log(this.pageData.formGroup.value);
      this.appService.scrollToItem($(".content-wrapper")[0])
    }
    else{
      this.appService.fieldValidation(this.elm);
      this.appService.markControlsTouched(this.pageData.formGroup);
    }
  }



  calculate(){

    for (let i = 0; i < this.loanNumbers.length; i++) {
      this.loanNumbers.controls[i].setValidators([Validators.required]);
      this.loanNumbers.controls[i].updateValueAndValidity();
    }

    if(this.pageData.formGroup.valid) {

      const backEndData = [{
        "loanNo": "3",
        "amount": 15000,
        "interestRate": 5,
        "appriserRate": 5,
        "monthInterest": 300,
        "loanDate": "10/10/2019",
        "calculatedInterest": 1000,
        "receivedInterest": null,
        "name": "Samy",
        "lastName": "Anbu",
        "item": "ring 2",
        "netWeight": "2.000g",
        "itemDesc": "Having some bend",
        "imageData": "data:image/jpeg;base64,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",
        "street": "Main Road",
        "place": "Saliyamangalam"

      },
        {
          "loanNo": "33",
          "amount": 25000,
          "calculatedInterest": 2500,
          "receivedInterest": null,
          "interestRate": 5,
          "appriserRate": 5,
          "monthInterest": 500,
          "loanDate": "10/10/2019",
          "name": "Arumugam",
          "lastName": "Sivanesan",
          "item": "necklace 2",
          "netWeight": "16.000g",
          "itemDesc": "",
          "imageData": "data:image/jpeg;base64,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",
          "street": "Main Road",
          "place": "Poondi"
        }
      ];

      const loanDetails = backEndData.map(data => {
        return this.fb.group({
          loanNo: data.loanNo,
          amount: data.amount,
          calculatedInterest: data.calculatedInterest,
          receivedInterest: null,
          totalAmt: data.amount + data.calculatedInterest,
          imageData: data.imageData,
          loanDate: data.loanDate,
          interestRate: data.interestRate,
          name: data.name,
          lastName: data.lastName,
          monthInterest: data.monthInterest,
          street: data.street,
          place: data.place,
          item: data.item,
          netWeight: data.netWeight,
          itemDesc: data.itemDesc
        });
      });
      const loanDetailsArray: FormArray = this.fb.array(loanDetails);
      this.pageData.formGroup.setControl('loanDetails', loanDetailsArray);
      this.calculateTotalSum();
      this.startCamera();
    }
    else{
      this.appService.fieldValidation(this.elm);
      this.appService.markControlsTouched(this.pageData.formGroup);
    }
  }



  viewLoan(val){
    let template = Handlebars.compile(this.fetchViewHTMLSrc(val.imageData));
    $('#loanStuff').html(template(val));
    $("#viewModal").modal('show');
  }

  fetchViewHTMLSrc(imageData){
    let source = '<div>\n' +
      ' <table> \n' +
      '      <tr> \n' +
      '      <td rowspan="6"> <img src= '+imageData+'> </td>\n' +
      '      </tr>\n' +
      '      <tr> \n' +
      '     <td width="5%"> </td>\n' +
      '      <td > <b>Loan No: </b> {{loanNo}} </td>\n' +
      '     <td width="5%"> </td> \n' +
      '       <td> <b>Loan Date:</b> {{loanDate}} </td>\n' +
      '       </tr>\n' +
      '        <tr> \n' +
      '     <td width="5%"> </td>\n' +
      '      <td> <b>Amount: </b>{{amount}} </td>\n' +
      '     <td width="5%"> </td>\n' +
      '       <td><b>Interest Rate:</b>  {{interestRate}} </td>\n' +
      '    <td width="5%"> </td> \n' +
      '       <td> <b>1 Month Interest: </b> {{monthInterest}} </td>\n' +
      '       </tr>\n' +
      '         <tr> \n' +
      '         <td width="5%"> </td>\n' +
      '      <td > <b> Name: </b> {{name}} </td>\n' +
      '     <td width="5%"> </td> \n' +
      '       <td> <b> Last Name: </b> {{lastName}} </td>\n' +
      '       </tr>\n' +
      '     <tr> \n' +
      '     <td width="5%"> </td>\n' +
      '      <td ><b>Place: </b> {{place}}</td>\n' +
      '     <td width="5%"> </td> \n' +
      '       <td><b>Street Name: </b> {{street}} </td>\n' +
      '       </tr>\n' +
      '    <tr> \n' +
      '    <td width="5%"> </td>\n' +
      '      <td ><b>Item: </b> {{item}}</td>\n' +
      '     <td width="5%"> </td> \n' +
      '       <td><b> Net weight: </b>{{netWeight}} </td>\n' +
      '    <td width="5%"> </td> \n' +
      '       <td> <b> Item desc: </b> {{itemDesc}} </td>\n' +
      '       </tr>\n' +
      '     </table>\n' +
      '<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">close</button>' +
      ' </div>';
    return source;
  }

  onChangeisLoaner(isChecked: boolean){
    if(isChecked){
      this.displayReturnerDeatils = false;
    }
    else{
      this.displayReturnerDeatils = true;
      this.startCamera();
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

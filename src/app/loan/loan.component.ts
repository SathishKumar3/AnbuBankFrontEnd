import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PageData} from "../page-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {AbstractControl, FormBuilder} from "@angular/forms";

import {TypeaheadService} from "../typeahead.service";


declare let $ : any;




@Component({
  selector: 'home',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})


export class LoanComponent implements OnInit {

  pageData: PageData;
  interestRateOptions: number[] = [5,4,3,2.5,2];
  searchName : string;
  searchPlace : string;
  loanDetails : any;
  @ViewChild("video",{static: false})
   video: ElementRef;

  @ViewChild("canvas",{static: false})
   canvas: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private typeaheadService: TypeaheadService,
    private renderer: Renderer2,
    private elm: ElementRef

  ) {
  }

  ngOnInit() {
    this.pageData = this.appService.getPageData(this.router.url);
    this.pageData.formGroup = this.appService.getLoanFormGroup();
    this.searchName = this.typeaheadService.typeaheadName();
    this.searchPlace = this.typeaheadService.typeaheadPlace();
    this.loanDate.setValue(new Date());
    this.startCamera();
  }

  startCamera() {
    if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(this.attachVideo.bind(this)).catch();
    } else {
      console.log('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
  }

  capture() {
    let width = 150, height = 125;
    let xAdjust = width * .001;
    let  yAdjust = height * .001;

    this.renderer.setProperty(this.canvas.nativeElement, 'width', width);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', height);
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement,  0 - xAdjust, 0 - yAdjust, width,height);
    console.log(this.canvas.nativeElement.toDataURL("image/jpeg"));
    console.log(this.canvas.nativeElement.toDataURL("image/jpeg").length);
    this.loanerImg.setValue(this.canvas.nativeElement.toDataURL("image/jpeg"));

  }


  cancel() {
    $('#confirmCancelModal').modal('show');
  }

  homePage(){
    this.pageData = this.appService.routeNavigation(0);
  }

  submit(){

    if(this.pageData.formGroup.valid) {
      console.log(this.pageData.formGroup.value);

      //TODO: from backend
      this.loanDetails = {
        "loanNo": "3",
        "amount": 15000,
        "interestRate": 5,
        "appraiserFee": 50,
        "monthInterest": 500,
        "amountToGive" : 14450,
        "loanDate": "10/10/2019",
        "name": "Samy",
        "lastName": "Anbu",
        "item": "ring 2"
      }

      this.loanNo.setValue(this.loanDetails.loanNo);
      this.appService.scrollToItem($(".content-wrapper")[0])
    }
      else{
        this.appService.fieldValidation(this.elm);
        this.appService.markControlsTouched(this.pageData.formGroup);
      }
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






  get loanDate(): AbstractControl { return this.pageData.formGroup.get('loanDate'); }
  get loanNo(): AbstractControl { return this.pageData.formGroup.get('loanNo'); }
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
  get loanerImg(): AbstractControl { return this.pageData.formGroup.get('loanerImg'); }

}

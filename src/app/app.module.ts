import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoanComponent} from "./loan/loan.component";
import {ReturnComponent} from "./return/return.component";
import {OcticonDirective} from "./octicon.directive";
import {DailysheetComponent} from "./dailySheet/dailysheet.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchComponent} from "./search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoanComponent,
    ReturnComponent,
    OcticonDirective,
    DailysheetComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    MatFormFieldModule
  ],
  exports: [
    OcticonDirective
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

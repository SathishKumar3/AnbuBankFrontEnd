import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoanComponent} from "./loan/loan.component";
import {ReturnComponent} from "./return/return.component";
import {DailysheetComponent} from "./dailySheet/dailysheet.component";
import {SearchComponent} from "./search/search.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'loan',
    component : LoanComponent
  },
  {
    path : 'return',
    component : ReturnComponent
  },
  {
    path: 'dailySheet',
    component: DailysheetComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

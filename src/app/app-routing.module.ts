import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoanComponent} from "./loan/loan.component";
import {ReturnComponent} from "./return/return.component";
import {DailysheetComponent} from "./dailySheet/dailysheet.component";


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MAIN_ROUTES} from './app.route';
import {LoginDComponent} from "./login-d/login-d.component";
const routes: Routes = [

];
@NgModule({
imports : [RouterModule.forRoot(MAIN_ROUTES)],
exports: [RouterModule]
})
export class AppRoutingModule{}

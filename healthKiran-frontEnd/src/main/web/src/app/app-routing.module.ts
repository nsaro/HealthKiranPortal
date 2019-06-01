import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {SearchResolver} from "./search-page/SearchResolver";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'search', component: SearchPageComponent, resolve: { cres: SearchResolver} }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [SearchResolver]
})
export class AppRoutingModule { }

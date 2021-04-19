import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterDropdownComponent } from './shared/components/filter-dropdown/filter-dropdown/filter-dropdown.component';

import { MerchantSelectionComponent } from './pages/merchant-selection/merchant-selection.component';
import {SearchBarModule} from './shared/components/search-bar/search-bar.module';
import {HttpClientModule} from '@angular/common/http';
import {FilterDropdownModule} from './shared/components/filter-dropdown/filter-dropdown.module';
import {MerchantCardModule} from './shared/components/merchant-card/merchant-card.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MerchantSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchBarModule,
    HttpClientModule,
    FilterDropdownModule,
    MerchantCardModule,
    FontAwesomeModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

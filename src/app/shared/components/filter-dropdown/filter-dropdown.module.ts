import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterDropdownComponent} from './filter-dropdown/filter-dropdown.component';



@NgModule({
  declarations: [
    FilterDropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterDropdownComponent
  ]
})
export class FilterDropdownModule { }

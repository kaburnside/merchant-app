import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantCardComponent } from './merchand-card/merchant-card.component';



@NgModule({
  declarations: [
    MerchantCardComponent
  ],
  exports: [
    MerchantCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MerchantCardModule { }

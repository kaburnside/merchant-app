import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.scss']
})
export class MerchantCardComponent {
  @Input() title = '';
  @Input() minAmount = 0;
  @Input() maxAmount = 0;
  @Input() thumbnail = '';
  @Input() website = '';
}

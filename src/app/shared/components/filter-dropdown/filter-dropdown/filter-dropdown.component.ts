import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent {
  @Input() filterPlaceHolder = 'Select';
  @Input() filterOptions = [''];
  @Output() dropdownSelectionChange: EventEmitter<string> = new EventEmitter<string>();
}

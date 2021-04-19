import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholderText = '';
  @Output() searchInputEmitter: EventEmitter<string> = new EventEmitter<string>();

}

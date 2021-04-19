import {Component, OnInit} from '@angular/core';
import {MerchantService} from '../../services/merchant.service';

@Component({
  selector: 'app-merchant-selection',
  templateUrl: './merchant-selection.component.html',
  styleUrls: ['./merchant-selection.component.scss']
})
export class MerchantSelectionComponent implements OnInit {
  placeholder = 'Search';
  dropdownPlaceHolder = 'Filter by Category';
  filterOptions: string[] = [];
  private currentCategory = '';

  constructor(public merchantService: MerchantService) {

  }

  ngOnInit(): void {
    this.merchantService.getMerchants();
    this.merchantService.getMerchantCategories().subscribe((categories: string[]) => {
      this.filterOptions = ['All', ...categories];
    });
  }

  /**
   * Search current merchant list - which could be the filtered list by category
   * if the string is empty we will reset the list to the current selected category
   * @param $event - search box input
   */
  handleSearch($event: string): void {
    if ($event !== '') {
      this.merchantService.searchMerchants($event.trim());
    } else {
      this.getMerchantListOfPreviousCategory();
    }
  }

  /**
   * This will get the categories from the merchant map by it's key (category)
   * We are setting the current category for when the search input gets deleted we can revert back to the previous category
   * @param $event - dropdown selection
   */
  handleDropDownSelection($event: string): void {
    if ($event) {
      this.currentCategory = $event;
      this.merchantService.getMerchantListByCategory($event);
    }
  }

  /**
   * Returns the list of merchants from the current selected category
   */
  getMerchantListOfPreviousCategory(): void {
    this.merchantService.getMerchantListByCategory(this.currentCategory);
  }
}

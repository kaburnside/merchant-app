import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Merchant} from '../models/merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private httpClient: HttpClient) {
  }

  private merchantUrl = 'https://staging.guusto.io:8443/merchant/merchant/findAllWithoutLimit';
  private mappedMerchants = new Map<string, Merchant[]>();
  private lastAccessed = 0;
  private masterMerchantList: Merchant[] = [];
  private merchantList = new BehaviorSubject<Merchant[]>([]);
  private categoriesObs = new BehaviorSubject<string[]>(['']);

  /**
   * Handle Http operation that failed.
   */
  private static handleError(error: HttpErrorResponse): Observable<never> {
    console.error('There was an error trying to get the merchant list: ', error);
    return throwError('There was an issue with fetching the merchant data, please try again');
  }

  /**
   * Capitalizes the first letter of the input string
   * Normally I would have this in a separate service as it does not directly have anything to do with the MerchantService
   * @param wordToCapitalize
   * @private
   */
  private static titleCaseHelper(wordToCapitalize: string): string {
    if (wordToCapitalize === '') {
      return wordToCapitalize;
    }
    return wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1).toLowerCase();
  }

  /**
   * Gets the list of merchants from the provided URL
   */
  getMerchantsFromApi(): Observable<Merchant[]> {
    return this.httpClient.get<Merchant[]>(this.merchantUrl)
      .pipe(
        catchError(MerchantService.handleError)
      );
  }

  /**
   * In order to reduce calls to the backend we only allow it to call every 30 seconds
   * This is helpful if a user navigates to another page and then back again quickly
   * If a new list returns from the backend it will remap the array, set the masterList again and set the merchantList Obs
   */
  getMerchants(): void {
    if (Date.now() - this.lastAccessed > 30000 && this.mappedMerchants !== undefined) {
      this.lastAccessed = Date.now();
      this.getMerchantsFromApi().subscribe(list => {
        this.masterMerchantList = list;
        this.mapMerchantArray(this.masterMerchantList);
        this.setMerchantList(this.masterMerchantList);
        this.merchantList.next(this.masterMerchantList);
      });
    } else {
      this.merchantList.next(this.masterMerchantList);
    }
  }

  /**
   * We are searching only the current merchantList, so if a user has selected DRINK
   * and then typed in the search it will only search that category
   * The user is also able to search by type - helpful for when it is an un filtered list
   * @param searchInput - Search input  to search by type or name
   */
  searchMerchants(searchInput: string): void {
    const list = this.merchantList.getValue();
    if (searchInput !== '') {
      this.merchantList.next(
        list.filter(checkTypeAndNameHelper));
    }

    /**
     * Helper function for filtering out the merchant array by type or name
     * @param merchant-the merchant object we are checking
     */
    function checkTypeAndNameHelper(merchant: Merchant): Merchant | undefined {
      if (merchant) {
        const merchantName = merchant.name;
        const merchantType = (merchant.type != null) ? merchant.type : 'Guusto';
        if (merchantName.toLowerCase().includes(searchInput.toLowerCase()) ||
          merchantType.toLowerCase().includes(searchInput.toLowerCase())) {
          return merchant;
        }
      }
      return;
    }
  }

  /**
   * Gets the array of merchants that have the type of category passed into the method
   * @param category - Category is the merchant type
   */
  getMerchantListByCategory(category: string): void {
    let categoryList = this.masterMerchantList;
    if (this.mappedMerchants.has(category)) {
      const merch = this.mappedMerchants.get(category);
      if (merch) {
        categoryList = [...merch];
      }
    }
    this.merchantList.next(categoryList);
  }

  getMerchantList(): Observable<Merchant[]> {
    return this.merchantList.asObservable();
  }

  getMerchantCategories(): Observable<string[]> {
    return this.categoriesObs.asObservable();
  }

  /**
   * Creates a map from the merchantList by type ie. Drink, Coffee, shopping etc
   * Then calls setMerchantCategories to create a list of categories
   * @param merchantList - List that will be mapped
   * @private
   */
  private mapMerchantArray(merchantList: Merchant[]): void {
    const mappedMerchants = new Map<string, Merchant[]>();
    // @ts-ignore
    merchantList.forEach((merchant: Merchant) => {
      let merchantArr = [merchant];
      if (merchant != null) {
        const merchantType: string = ((merchant.type != null) ? MerchantService.titleCaseHelper(merchant.type) : 'Guusto');
        if (mappedMerchants.has(merchantType)) {
          const merchantValue = mappedMerchants.get(merchantType);
          if (merchantValue) {
            merchantArr = merchantArr.concat(...merchantValue);
          }
        }
        mappedMerchants.set(merchantType, merchantArr as Merchant[]);
        return mappedMerchants;
      }
    }, Object.create(null));
    this.seMerchantMap(mappedMerchants);
    this.setMerchantCategories();
  }

  private setMerchantCategories(): void {
    const categories: Array<string> = [];
    for (const category of this.mappedMerchants.keys()) {
      categories.push(category);
    }
    return this.categoriesObs.next(categories);
  }

  private seMerchantMap(merchantMap: Map<string, Merchant[]>): void {
    this.mappedMerchants = merchantMap;
  }

  private setMerchantList(returnedMerchantList: Merchant[]): void {
    this.merchantList.next(returnedMerchantList);
  }
}

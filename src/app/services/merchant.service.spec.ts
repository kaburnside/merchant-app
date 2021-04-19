import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { MerchantService } from './merchant.service';
import {inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Merchant} from '../models/merchant';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('MerchantServiceService', () => {
  // tslint:disable-next-line:prefer-const
  let service: MerchantService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MerchantService]
    });
    service = TestBed.inject(MerchantService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value the same as the dummy post', (done: DoneFn) => {
    const dummyPosts: any[] = [{
      type: '1',
      name: '2',
      minAmount: 0,
      maxAmount: 35,
      image: 'image',
      website: 'www.google.ca'
    }, {
      type: '2',
      name: '3',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    }];
    service.getMerchants();
    const request = httpMock.expectOne( 'https://staging.guusto.io:8443/merchant/merchant/findAllWithoutLimit');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
    // @ts-ignore
    service.getMerchantList().subscribe(list => {
      expect(list.length).toBe(2);
      expect(list).toBeDefined(dummyPosts);
      done();
    });

  });

  it('should return the correct value for a search term', () => {
    const dummyPosts: any[] = [{
      type: '1',
      name: '3',
      minAmount: 0,
      maxAmount: 35,
      image: 'image',
      website: 'www.google.ca'
    }, {
      type: 'Drink',
      name: 'Pepsi',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    },
      {
        type: 'Coffee',
        name: 'Starbucks',
        minAmount: 0,
        maxAmount: 353,
        image: 'image2',
        website: 'www.yahoo.ca'
      }];
    // @ts-ignore
    service.merchantList.next(dummyPosts);
    // @ts-ignore
    service.searchMerchants('Pepsi');
    // @ts-ignore
    expect(service.merchantList.getValue()).toEqual([{
      // @ts-ignore
      type: 'Drink',
      // @ts-ignore
      name: 'Pepsi',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    }]);
  });

  it('should map the data correctly', fakeAsync(() => {
    const dummyPosts: any[] = [{
      type: 'Drink',
      name: 'Pepsi',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    },
      {
        type: 'Coffee',
        name: 'Starbucks',
        minAmount: 0,
        maxAmount: 353,
        image: 'image2',
        website: 'www.yahoo.ca'
      }];

    const expectedOutcome = new Map<string, any[]>();
    expectedOutcome.set('Drink', [{
      type: 'Drink',
      name: 'Pepsi',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    }]);
    expectedOutcome.set('Coffee', [{
      type: 'Coffee',
      name: 'Starbucks',
      minAmount: 0,
      maxAmount: 353,
      image: 'image2',
      website: 'www.yahoo.ca'
    }]);
    // @ts-ignore
    service.mapMerchantArray(dummyPosts);
    // @ts-ignore
    expect(service.mappedMerchants).toEqual(expectedOutcome);
  }));
});

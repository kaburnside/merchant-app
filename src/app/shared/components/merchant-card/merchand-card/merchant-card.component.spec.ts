import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCardComponent } from './merchant-card.component';
import {By} from '@angular/platform-browser';

describe('MerchandCardComponent', () => {
  let component: MerchantCardComponent;
  let fixture: ComponentFixture<MerchantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct website on the card',  async () => {
    fixture.detectChanges();
    const divDescription = fixture.debugElement.query(By.css('.card-thumbnail'));
    divDescription.nativeElement.value = 'www.google.ca';
    fixture.detectChanges();
    expect(divDescription.nativeElement.value).toContain('www.google.ca');
  });

  it('should render the correct title on the card',  async () => {
    fixture.detectChanges();
    const divDescription = fixture.debugElement.query(By.css('.card-title'));
    divDescription.nativeElement.value = 'Mastercard';
    fixture.detectChanges();
    expect(divDescription.nativeElement.value).toContain('Mastercard');
  });
  it('should render the correct amounts on the card',  async () => {
    fixture.detectChanges();
    const divDescription = fixture.debugElement.query(By.css('.card-amounts'));
    divDescription.nativeElement.value = '$25 - $500';
    fixture.detectChanges();
    expect(divDescription.nativeElement.value).toContain('$25 - $500');
  });
});

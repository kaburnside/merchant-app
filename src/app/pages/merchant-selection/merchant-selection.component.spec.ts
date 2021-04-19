import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MerchantSelectionComponent } from './merchant-selection.component';
import {MerchantService} from '../../services/merchant.service';

describe('MerchantSelectionComponent', () => {
  let component: MerchantSelectionComponent;
  let merchantServiceStub: jasmine.SpyObj<MerchantService>;
  function createMerchantServiceStub(): jasmine.SpyObj<MerchantService> {
    const stub: jasmine.SpyObj<MerchantService> = jasmine.createSpyObj(
      MerchantService.name,
      [
        'searchMerchants',
      ]);

    resetMerchantServiceStub(stub);

    return stub;
  }

  function resetMerchantServiceStub(
    stub: jasmine.SpyObj<MerchantService>,
  ): void {
    stub.searchMerchants
      .and.returnValue()
      .calls.reset();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    merchantServiceStub = createMerchantServiceStub();
    component = new MerchantSelectionComponent(merchantServiceStub as unknown as MerchantService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emits filtered heroes', () => {
    it('when the user searches', fakeAsync(() => {
      const missMarvel = 'Guusto';

      component.handleSearch(missMarvel);
      tick();

      expect(component.merchantService.searchMerchants).toHaveBeenCalledTimes(1);
    }));

    it('passes the correct input to the search merchants', () => {
      const storm = 'storm';
      const medusa = 'medusa';

      component.handleSearch(storm);

      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledTimes(1);
      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledWith(storm);

      component.handleSearch(medusa);

      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledTimes(2);
      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledWith(medusa);
    });

    it('trims the string of leading white space', () => {
      const guusto = 'guusto';

      component.handleSearch(' \t\t\t ' + guusto + ' \t\r\n  \r\n ');

      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledTimes(1);
      expect(merchantServiceStub.searchMerchants).toHaveBeenCalledWith(guusto);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownComponent } from './filter-dropdown.component';
import {By} from '@angular/platform-browser';

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent;
  let fixture: ComponentFixture<FilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct options',  async () => {
    fixture.detectChanges();
    const divDescription = fixture.debugElement.query(By.css('.dropdown-option'));
    divDescription.nativeElement.value = 'Guusto';
    fixture.detectChanges();
    expect(divDescription.nativeElement.value).toContain('Guusto');
  });
});

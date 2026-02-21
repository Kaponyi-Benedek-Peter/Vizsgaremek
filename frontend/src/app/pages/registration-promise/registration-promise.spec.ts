import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPromise } from './registration-promise';

describe('RegistrationPromise', () => {
  let component: RegistrationPromise;
  let fixture: ComponentFixture<RegistrationPromise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPromise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationPromise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

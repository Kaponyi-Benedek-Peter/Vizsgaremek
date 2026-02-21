import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bracket } from './bracket';

describe('Bracket', () => {
  let component: Bracket;
  let fixture: ComponentFixture<Bracket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bracket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bracket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

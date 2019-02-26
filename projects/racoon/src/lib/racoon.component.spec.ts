import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacoonComponent } from './racoon.component';

describe('RacoonComponent', () => {
  let component: RacoonComponent;
  let fixture: ComponentFixture<RacoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

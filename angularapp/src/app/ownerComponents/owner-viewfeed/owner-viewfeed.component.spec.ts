import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewfeedComponent } from './owner-viewfeed.component';

describe('OwnerViewfeedComponent', () => {
  let component: OwnerViewfeedComponent;
  let fixture: ComponentFixture<OwnerViewfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerViewfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerViewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

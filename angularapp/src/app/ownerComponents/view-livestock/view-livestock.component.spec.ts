import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLivestockComponent } from './view-livestock.component';

describe('ViewLivestockComponent', () => {
  let component: ViewLivestockComponent;
  let fixture: ComponentFixture<ViewLivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCancelledComponent } from './pay-cancelled.component';

describe('PayCancelledComponent', () => {
  let component: PayCancelledComponent;
  let fixture: ComponentFixture<PayCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayCancelledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

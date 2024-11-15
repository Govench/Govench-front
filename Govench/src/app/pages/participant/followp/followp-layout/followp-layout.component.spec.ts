import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowpLayoutComponent } from './followp-layout.component';

describe('FollowpLayoutComponent', () => {
  let component: FollowpLayoutComponent;
  let fixture: ComponentFixture<FollowpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowpLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

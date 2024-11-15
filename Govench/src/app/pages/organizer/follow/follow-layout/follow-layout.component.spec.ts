import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowLayoutComponent } from './follow-layout.component';

describe('FollowLayoutComponent', () => {
  let component: FollowLayoutComponent;
  let fixture: ComponentFixture<FollowLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

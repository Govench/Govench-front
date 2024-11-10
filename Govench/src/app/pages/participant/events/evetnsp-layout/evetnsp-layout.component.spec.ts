import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvetnspLayoutComponent } from './evetnsp-layout.component';

describe('EvetnspLayoutComponent', () => {
  let component: EvetnspLayoutComponent;
  let fixture: ComponentFixture<EvetnspLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvetnspLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvetnspLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

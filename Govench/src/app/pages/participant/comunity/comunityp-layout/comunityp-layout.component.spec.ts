import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunitypLayoutComponent } from './comunityp-layout.component';

describe('ComunitypLayoutComponent', () => {
  let component: ComunitypLayoutComponent;
  let fixture: ComponentFixture<ComunitypLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunitypLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunitypLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

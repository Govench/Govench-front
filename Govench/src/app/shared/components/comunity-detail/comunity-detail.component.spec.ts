import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityDetailComponent } from './comunity-detail.component';

describe('ComunityDetailComponent', () => {
  let component: ComunityDetailComponent;
  let fixture: ComponentFixture<ComunityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

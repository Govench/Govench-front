import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityPertainComponent } from './comunity-pertain.component';

describe('ComunityPertainComponent', () => {
  let component: ComunityPertainComponent;
  let fixture: ComponentFixture<ComunityPertainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityPertainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityPertainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

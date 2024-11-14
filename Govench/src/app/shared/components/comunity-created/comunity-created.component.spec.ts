import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityCreatedComponent } from './comunity-created.component';

describe('ComunityCreatedComponent', () => {
  let component: ComunityCreatedComponent;
  let fixture: ComponentFixture<ComunityCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

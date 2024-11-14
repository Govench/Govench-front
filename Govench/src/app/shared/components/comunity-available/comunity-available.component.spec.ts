import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityAvailableComponent } from './comunity-available.component';

describe('ComunityAvailableComponent', () => {
  let component: ComunityAvailableComponent;
  let fixture: ComponentFixture<ComunityAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

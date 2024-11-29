import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityManageComponent } from './comunity-manage.component';

describe('ComunityManageComponent', () => {
  let component: ComunityManageComponent;
  let fixture: ComponentFixture<ComunityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

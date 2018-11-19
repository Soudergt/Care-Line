import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HipaadialogComponent } from './hipaadialog.component';

describe('HipaadialogComponent', () => {
  let component: HipaadialogComponent;
  let fixture: ComponentFixture<HipaadialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HipaadialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HipaadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

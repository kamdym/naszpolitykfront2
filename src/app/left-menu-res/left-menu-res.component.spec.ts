import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuResComponent } from './left-menu-res.component';

describe('LeftMenuResComponent', () => {
  let component: LeftMenuResComponent;
  let fixture: ComponentFixture<LeftMenuResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMenuResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

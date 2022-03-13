import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticiansListComponent } from './politicians-list.component';

describe('PoliticiansListComponent', () => {
  let component: PoliticiansListComponent;
  let fixture: ComponentFixture<PoliticiansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticiansListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticiansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

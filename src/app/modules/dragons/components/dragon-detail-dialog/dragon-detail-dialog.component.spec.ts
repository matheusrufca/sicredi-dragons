import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonDetailDialogComponent } from './dragon-detail-dialog.component';

describe('DragonDetailDialogComponent', () => {
  let component: DragonDetailDialogComponent;
  let fixture: ComponentFixture<DragonDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragonDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

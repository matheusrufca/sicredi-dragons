import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDragonConfirmationDialogComponent } from './remove-dragon-confirmation-dialog.component';

describe('RemoveDragonConfirmationDialogComponent', () => {
  let component: RemoveDragonConfirmationDialogComponent;
  let fixture: ComponentFixture<RemoveDragonConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDragonConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDragonConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

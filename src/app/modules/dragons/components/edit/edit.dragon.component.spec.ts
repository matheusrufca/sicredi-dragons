import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDragonComponent } from './edit.dragon.component';

describe('Edit.DragonComponent', () => {
  let component: EditDragonComponent;
  let fixture: ComponentFixture<EditDragonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDragonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

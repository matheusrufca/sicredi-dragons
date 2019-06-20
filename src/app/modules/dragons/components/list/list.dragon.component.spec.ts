import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDragonComponent } from './list.dragon.component';

describe('ListComponent', () => {
  let component: ListDragonComponent;
  let fixture: ComponentFixture<ListDragonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDragonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

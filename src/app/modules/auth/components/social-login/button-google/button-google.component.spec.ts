import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGoogleComponent } from './button-google.component';

describe('ButtonGoogleComponent', () => {
  let component: ButtonGoogleComponent;
  let fixture: ComponentFixture<ButtonGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

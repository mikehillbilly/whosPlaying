import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpireTypesComponent } from './umpire-types.component';

describe('UmpireTypesComponent', () => {
  let component: UmpireTypesComponent;
  let fixture: ComponentFixture<UmpireTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

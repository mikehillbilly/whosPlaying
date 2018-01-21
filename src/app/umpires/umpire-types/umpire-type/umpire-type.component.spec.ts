import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpireTypeComponent } from './umpire-type.component';

describe('UmpireTypeComponent', () => {
  let component: UmpireTypeComponent;
  let fixture: ComponentFixture<UmpireTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

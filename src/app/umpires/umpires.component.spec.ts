import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmpiresComponent } from './umpires.component';

describe('UmpiresComponent', () => {
  let component: UmpiresComponent;
  let fixture: ComponentFixture<UmpiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccreditationComponent } from './add-accreditation.component';

describe('AddAccreditationComponent', () => {
  let component: AddAccreditationComponent;
  let fixture: ComponentFixture<AddAccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccreditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

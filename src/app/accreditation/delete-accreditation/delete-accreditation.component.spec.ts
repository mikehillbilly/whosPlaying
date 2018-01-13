import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccreditationComponent } from './delete-accreditation.component';

describe('DeleteAccreditationComponent', () => {
  let component: DeleteAccreditationComponent;
  let fixture: ComponentFixture<DeleteAccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccreditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

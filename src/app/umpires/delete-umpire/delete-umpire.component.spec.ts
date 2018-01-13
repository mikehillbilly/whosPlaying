import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUmpireComponent } from './delete-umpire.component';

describe('DeleteUmpireComponent', () => {
  let component: DeleteUmpireComponent;
  let fixture: ComponentFixture<DeleteUmpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUmpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUmpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

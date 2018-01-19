import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AccreditationComponent', () => {
  let component: AccreditationComponent;
  let fixture: ComponentFixture<AccreditationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

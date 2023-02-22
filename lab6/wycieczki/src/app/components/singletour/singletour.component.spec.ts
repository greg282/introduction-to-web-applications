import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletourComponent } from './singletour.component';

describe('SingletourComponent', () => {
  let component: SingletourComponent;
  let fixture: ComponentFixture<SingletourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingletourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingletourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmanagerComponent } from './tripmanager.component';

describe('TripmanagerComponent', () => {
  let component: TripmanagerComponent;
  let fixture: ComponentFixture<TripmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

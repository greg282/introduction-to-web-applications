import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePersistenceComponent } from './state-persistence.component';

describe('StatePersistenceComponent', () => {
  let component: StatePersistenceComponent;
  let fixture: ComponentFixture<StatePersistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatePersistenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatePersistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

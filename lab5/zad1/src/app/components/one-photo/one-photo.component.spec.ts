import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePhotoComponent } from './one-photo.component';

describe('OnePhotoComponent', () => {
  let component: OnePhotoComponent;
  let fixture: ComponentFixture<OnePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

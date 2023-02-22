import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSiteComponent } from './main-site.component';

describe('MainSiteComponent', () => {
  let component: MainSiteComponent;
  let fixture: ComponentFixture<MainSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

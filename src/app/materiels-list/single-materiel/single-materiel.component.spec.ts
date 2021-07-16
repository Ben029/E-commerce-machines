import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMaterielComponent } from './single-materiel.component';

describe('SingleMaterielComponent', () => {
  let component: SingleMaterielComponent;
  let fixture: ComponentFixture<SingleMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionListComponent } from './habitacion-list';

describe('HabitacionList', () => {
  let component: HabitacionListComponent;
  let fixture: ComponentFixture<HabitacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

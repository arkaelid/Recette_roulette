import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesRecettesComponent } from './mes-recettes.component';

describe('MesRecettesComponent', () => {
  let component: MesRecettesComponent;
  let fixture: ComponentFixture<MesRecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesRecettesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

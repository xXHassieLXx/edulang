import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerEstudiantesPorCursoComponent } from './ver-estudiantes-por-curso.component';

describe('VerEstudiantesPorCursoComponent', () => {
  let component: VerEstudiantesPorCursoComponent;
  let fixture: ComponentFixture<VerEstudiantesPorCursoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEstudiantesPorCursoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerEstudiantesPorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

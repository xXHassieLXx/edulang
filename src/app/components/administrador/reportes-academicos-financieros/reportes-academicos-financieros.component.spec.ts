import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportesAcademicosFinancierosComponent } from './reportes-academicos-financieros.component';

describe('ReportesAcademicosFinancierosComponent', () => {
  let component: ReportesAcademicosFinancierosComponent;
  let fixture: ComponentFixture<ReportesAcademicosFinancierosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesAcademicosFinancierosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesAcademicosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

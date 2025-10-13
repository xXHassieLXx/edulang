import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilDatosPersonalesComponent } from './perfil-datos-personales.component';

describe('PerfilDatosPersonalesComponent', () => {
  let component: PerfilDatosPersonalesComponent;
  let fixture: ComponentFixture<PerfilDatosPersonalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDatosPersonalesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

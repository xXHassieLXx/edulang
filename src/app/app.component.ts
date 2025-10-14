import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { GestionCursosComponent } from './components/administrador/gestion-cursos/gestion-cursos.component';
import { GestionMatriculasComponent } from './components/administrador/gestion-matriculas/gestion-matriculas.component';
import { LoginComponent } from './components/login/login.component';
import { GestionPagosComponent } from './components/administrador/gestion-pagos/gestion-pagos.component';
import { app-gestion-pagos } from './components/administrador/gestion-pagos/gestion-pagos.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, GestionCursosComponent, GestionMatriculasComponent, LoginComponent, GestionPagosComponent, app-gestion-pagos],
})
export class AppComponent {
  constructor() {}
}

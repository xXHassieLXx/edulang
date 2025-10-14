import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { GestionCursosComponent } from './components/administrador/gestion-cursos/gestion-cursos.component';
import { GestionMatriculasComponent } from './components/administrador/gestion-matriculas/gestion-matriculas.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, GestionCursosComponent, GestionMatriculasComponent, LoginComponent],
})
export class AppComponent {
  constructor() {}
}

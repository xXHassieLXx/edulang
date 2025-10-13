import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { GestionCursosComponent } from './components/administrador/gestion-cursos/gestion-cursos.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, GestionCursosComponent],
})
export class AppComponent {
  constructor() {}
}

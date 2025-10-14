import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { GestionCursosComponent } from './administrador/gestion-cursos/gestion-cursos.component';
import { GestionUsuariosComponent } from './administrador/gestion-usuarios/gestion-usuarios.component';
import { GestionPagosComponent } from './administrador/gestion-pagos/gestion-pagos.component';
import { GestionMatriculasComponent } from './administrador/gestion-matriculas/gestion-matriculas.component';
import { ReportesAcademicosFinancierosComponent } from './administrador/reportes-academicos-financieros/reportes-academicos-financieros.component';

import { VerEstudiantesPorCursoComponent } from './docente/ver-estudiantes-por-curso/ver-estudiantes-por-curso.component';
import { PerfilDatosPersonalesComponent as PerfilDocenteComponent } from './docente/perfil-datos-personales/perfil-datos-personales.component';
import { MisCursosComponent as DocenteMisCursosComponent } from './docente/mis-cursos/mis-cursos.component';
import { HorarioCursosComponent as DocenteHorarioCursosComponent } from './docente/horario-cursos/horario-cursos.component';
import { AsignarCalificacionesComponent } from './docente/asignar-calificaciones/asignar-calificaciones.component';

import { PerfilDatosPersonalesComponent as EstPerfilDatosPersonalesComponent } from './estudiante/perfil-datos-personales/perfil-datos-personales.component';
import { HorarioCursosComponent as EstHorarioCursosComponent } from './estudiante/horario-cursos/horario-cursos.component';
import { MisCalificacionesComponent } from './estudiante/mis-calificaciones/mis-calificaciones.component';
import { MisCursosComponent as EstMisCursosComponent } from './estudiante/mis-cursos/mis-cursos.component';
import { MisPagosComponent } from './estudiante/mis-pagos/mis-pagos.component';
import { HistorialAcademicoComponent } from './estudiante/historial-academico/historial-academico.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [
    GestionUsuariosComponent,
    GestionPagosComponent,
    GestionMatriculasComponent,
    ReportesAcademicosFinancierosComponent,

    VerEstudiantesPorCursoComponent,
    PerfilDocenteComponent,
    DocenteMisCursosComponent,
    DocenteHorarioCursosComponent,
    AsignarCalificacionesComponent,

    EstPerfilDatosPersonalesComponent,
    EstHorarioCursosComponent,
    MisCalificacionesComponent,
    EstMisCursosComponent,
    MisPagosComponent,
    HistorialAcademicoComponent,
  ],
  exports: [
    GestionUsuariosComponent,
    GestionPagosComponent,
    GestionMatriculasComponent,
    ReportesAcademicosFinancierosComponent,

    VerEstudiantesPorCursoComponent,
    PerfilDocenteComponent,
    DocenteMisCursosComponent,
    DocenteHorarioCursosComponent,
    AsignarCalificacionesComponent,

    EstPerfilDatosPersonalesComponent,
    EstHorarioCursosComponent,
    MisCalificacionesComponent,
    EstMisCursosComponent,
    MisPagosComponent,
    HistorialAcademicoComponent,
  ],
})
export class ComponentsModule {}

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-gestion-cursos',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './gestion-cursos.component.html',
  styleUrls: ['./gestion-cursos.component.scss'],
})
export class GestionCursosComponent implements OnInit {

  cursos: Curso[] = [];
  filteredCursos: Curso[] = [];

  idiomas: string[] = ['Inglés', 'Francés', 'Alemán', 'Español', 'Italiano'];

  // filtros / busqueda
  query: string = '';
  selectedNivel: string = '';
  selectedIdioma: string = '';

  constructor(
    private cursoService : CursoService
  ) { }

  ngOnInit() {
    this.cursoService.getAllCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.filter();
        console.log('Cursos cargados:', this.cursos);
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
      }
    })
  }

  filter() {
  const q = this.query.trim().toLowerCase();
  this.filteredCursos = this.cursos.filter(c => {
    const matchesQuery = q === '' || [c.nombre, c.idioma].some(f => (f || '').toLowerCase().includes(q));
    const matchesNivel = this.selectedNivel === '' || c.nivel === this.selectedNivel;
    const matchesIdioma = this.selectedIdioma === '' || c.idioma === this.selectedIdioma;
    return matchesQuery && matchesNivel && matchesIdioma;
  });
}

  openCreate() {
    // placeholder: abrir modal para crear curso
    console.log('Abrir formulario para crear curso');
  }

  /*
  editCurso(curso: Curso) {
    console.log('Editar curso', curso);
  }

  deleteCurso(curso: Curso) {
    // Acción simple de ejemplo: confirmar y eliminar localmente
    if (confirm(`¿Eliminar el curso "${curso.nombre}"? Esta acción no se puede deshacer.`)) {
      this.cursos = this.cursos.filter(c => c.curso_id !== curso.curso_id);
      this.filter();
    }
  }
  */

}

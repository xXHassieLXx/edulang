import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Curso {
  curso_id: number;
  nombre: string;
  nivel: string; // A1..C2
  idioma: string;
  horario: string;
  cupo: number;
  docenteId?: number | null;
  docenteNombre?: string | null;
}

@Component({
  selector: 'app-gestion-cursos',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
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

  constructor() { }

  ngOnInit() {
    // Datos de ejemplo; en la app real se obtendrán via HTTP desde el backend
    this.cursos = [
      { curso_id: 1, nombre: 'Inglés - Principiantes', nivel: 'A1', idioma: 'Inglés', horario: 'Lunes y Miércoles 18:00-20:00', cupo: 20, docenteId: 1, docenteNombre: 'María López' },
      { curso_id: 2, nombre: 'Francés Intermedio', nivel: 'B1', idioma: 'Francés', horario: 'Martes y Jueves 10:00-12:00', cupo: 15, docenteId: 2, docenteNombre: 'Jean Dupont' },
      { curso_id: 3, nombre: 'Alemán Avanzado', nivel: 'C1', idioma: 'Alemán', horario: 'Sábados 09:00-13:00', cupo: 10, docenteId: null, docenteNombre: null },
      { curso_id: 4, nombre: 'Español para Extranjeros', nivel: 'A2', idioma: 'Español', horario: 'Lunes a Viernes 09:00-10:30', cupo: 25, docenteId: 3, docenteNombre: 'Carlos Pérez' }
    ];

    this.filteredCursos = [...this.cursos];
  }

  filter() {
    const q = this.query.trim().toLowerCase();
    this.filteredCursos = this.cursos.filter(c => {
      const matchesQuery = q === '' || [c.nombre, c.idioma, c.docenteNombre || ''].some(f => f.toLowerCase().includes(q));
      const matchesNivel = this.selectedNivel === '' || c.nivel === this.selectedNivel;
      const matchesIdioma = this.selectedIdioma === '' || c.idioma === this.selectedIdioma;
      return matchesQuery && matchesNivel && matchesIdioma;
    });
  }

  openCreate() {
    // placeholder: abrir modal para crear curso
    console.log('Abrir formulario para crear curso');
  }

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

}

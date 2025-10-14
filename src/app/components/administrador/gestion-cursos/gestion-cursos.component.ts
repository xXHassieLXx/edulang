import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
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
  imports: [IonicModule, CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatListModule, MatButtonModule, MatDialogModule],
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

  // crear curso
  showCreate: boolean = false; // legacy flag (no longer used)
  newCurso: Partial<Curso> = {
    nombre: '',
    nivel: '',
    idioma: '',
    horario: '',
    cupo: 0,
    docenteNombre: ''
  };

  @ViewChild('createDialog') createDialog!: TemplateRef<any>;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef?: MatDialogRef<any>;
  private editDialogRef?: MatDialogRef<any>;
  // curso en edición
  editingCurso?: Curso | null = null;

  

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

  constructor(public dialog: MatDialog) { }

  openCreate() {
    // Resetear
    this.newCurso = { nombre: '', nivel: '', idioma: '', horario: '', cupo: 0, docenteNombre: '' };
  this.dialogRef = this.dialog.open(this.createDialog, { width: '600px', height: '65vh', panelClass: 'centered-dialog' });
  }

  openEdit(curso: Curso) {
    // clonar para evitar mutaciones directas hasta confirmar
    this.editingCurso = { ...curso };
    this.editDialogRef = this.dialog.open(this.editDialog, { width: '600px', height: '65vh', panelClass: 'centered-dialog' });
  }

  updateCurso() {
    if (!this.editingCurso) return;
    // validaci\u00f3n simple
    if (!this.editingCurso.nombre || !this.editingCurso.nivel || !this.editingCurso.idioma) {
      alert('Por favor completa los campos requeridos.');
      return;
    }
    // encontrar y reemplazar en el arreglo original
    const idx = this.cursos.findIndex(c => c.curso_id === this.editingCurso!.curso_id);
    if (idx !== -1) {
      this.cursos[idx] = { ...this.editingCurso } as Curso;
      this.filter();
    }
    if (this.editDialogRef) this.editDialogRef.close();
  }

  createCurso() {
    // validación básica
    if (!this.newCurso.nombre || !this.newCurso.nivel || !this.newCurso.idioma || !this.newCurso.horario || !this.newCurso.cupo) {
      alert('Por favor completa todos los campos del curso.');
      return;
    }

    const nextId = this.cursos.length ? Math.max(...this.cursos.map(c => c.curso_id)) + 1 : 1;
    const curso: Curso = {
      curso_id: nextId,
      nombre: this.newCurso.nombre as string,
      nivel: this.newCurso.nivel as string,
      idioma: this.newCurso.idioma as string,
      horario: this.newCurso.horario as string,
      cupo: Number(this.newCurso.cupo) as number,
      docenteId: null,
      docenteNombre: this.newCurso.docenteNombre || null,
    };

    this.cursos.unshift(curso);
    this.filter();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
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

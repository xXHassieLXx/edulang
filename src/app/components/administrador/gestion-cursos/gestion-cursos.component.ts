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
import { CursoDocenteDto } from 'src/app/models/dto/cursoDocenteDto.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-gestion-cursos',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './gestion-cursos.component.html',
  styleUrls: ['./gestion-cursos.component.scss'],
})
export class GestionCursosComponent implements OnInit {

  cursos: CursoDocenteDto[] = [];
  filteredCursos: CursoDocenteDto[] = [];

  idiomas: string[] = ['Inglés', 'Francés', 'Alemán', 'Español', 'Italiano'];

  // filtros / busqueda
  query: string = '';
  selectedNivel: string = '';
  selectedIdioma: string = '';

  // crear curso
  showCreate: boolean = false; // legacy flag (no longer used)
  newCurso: Partial<CursoDocenteDto> = {
    nombre: '',
    nivel: '',
    idioma: '',
    horario: '',
    cupo: 0,
    nombreDocente: ''
  };

  constructor(
    public dialog : MatDialog,
    private cursoService : CursoService
  ) {}

  @ViewChild('createDialog') createDialog!: TemplateRef<any>;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef?: MatDialogRef<any>;
  private editDialogRef?: MatDialogRef<any>;
  // curso en edición
  editingCurso?: CursoDocenteDto | null = null;

  

  ngOnInit() {
    this.cursoService.getAllCursosWithDocente().subscribe({
      next: (data) => {
        this.cursos = data;
        this.filter();
        console.log('Datos cargados: ', data)
      },
      error: (err) => {
        console.log('Error al cargar cursos: ', err);
      }
    })
    // Datos de ejemplo; en la app real se obtendrán via HTTP desde el backend
  }

  filter() {
    const q = this.query.trim().toLowerCase();
    this.filteredCursos = this.cursos.filter(c => {
      const matchesQuery = q === '' || [c.nombre, c.idioma, c.nombreDocente || ''].some(f => f.toLowerCase().includes(q));
      const matchesNivel = this.selectedNivel === '' || c.nivel === this.selectedNivel;
      const matchesIdioma = this.selectedIdioma === '' || c.idioma === this.selectedIdioma;
      return matchesQuery && matchesNivel && matchesIdioma;
    });
  }

  openCreate() {
    // Resetear
    this.newCurso = { nombre: '', nivel: '', idioma: '', horario: '', cupo: 0, nombreDocente: '' };
  this.dialogRef = this.dialog.open(this.createDialog, { width: '600px', height: '65vh', panelClass: 'centered-dialog' });
  }

  openEdit(curso: CursoDocenteDto) {
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
    const idx = this.cursos.findIndex(c => c.cursoId === this.editingCurso!.cursoId);
    if (idx !== -1) {
      this.cursos[idx] = { ...this.editingCurso } as CursoDocenteDto;
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

    const nextId = this.cursos.length ? Math.max(...this.cursos.map(c => c.cursoId)) + 1 : 1;
    const curso: CursoDocenteDto = {
      cursoId: nextId,
      nombre: this.newCurso.nombre as string,
      nivel: this.newCurso.nivel as string,
      idioma: this.newCurso.idioma as string,
      horario: this.newCurso.horario as string,
      cupo: Number(this.newCurso.cupo),
      docenteId: 0,
      nombreDocente: this.newCurso.nombreDocente || '',
      apellidoDocente: this.newCurso.apellidoDocente || '',
      especialidad: this.newCurso.especialidad || '',
      disponibilidad: this.newCurso.disponibilidad || ''
    };

    this.cursos.unshift(curso);
    this.filter();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  editCurso(curso: CursoDocenteDto) {
    console.log('Editar curso', curso);
  }

  deleteCurso(curso: CursoDocenteDto) {
    // Acción simple de ejemplo: confirmar y eliminar localmente
    if (confirm(`¿Eliminar el curso "${curso.nombre}"? Esta acción no se puede deshacer.`)) {
      this.cursos = this.cursos.filter(c => c.cursoId !== curso.cursoId);
      this.filter();
    }
  }

}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatriculaService } from '../../../services/matricula.service';

interface MatriculaDTO {
  matricula_id: number;
  estudiante: { id: number; nombre: string; documento?: string; email?: string };
  curso: { id: number; nombre: string; nivel?: string; idioma?: string };
  fecha: string; // ISO
  estado: 'Activa' | 'Cancelada' | 'Finalizada';
  observaciones?: string;
}

@Component({
  selector: 'app-gestion-matriculas',
  templateUrl: './gestion-matriculas.component.html',
  styleUrls: ['./gestion-matriculas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class GestionMatriculasComponent implements OnInit {
  matriculas: MatriculaDTO[] = [];
  filtered: MatriculaDTO[] = [];

  cursos: Array<{ id: number; nombre: string }> = [];

  // filtros
  query: string = '';
  selectedCursoId: number | '' = '';
  selectedEstado: string = '';

  @ViewChild('createDialog') createDialog!: TemplateRef<any>;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef?: MatDialogRef<any>;

  newMatricula: any = { fecha: new Date().toISOString().slice(0, 10), observaciones: '' };
  editingMatricula: any = null;

  constructor(private matriculaService: MatriculaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.matriculaService.getMatriculas().subscribe((data: any[]) => {
      this.matriculas = data;
      this.filtered = [...this.matriculas];
    });
    this.matriculaService.getCursos().subscribe((c: any[]) => (this.cursos = c));
  }

  filter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = this.matriculas.filter((m) => {
      const matchesQuery = q === '' || [m.estudiante.nombre, m.estudiante.documento || '', m.curso.nombre].some((f) => f.toLowerCase().includes(q));
      const matchesCurso = this.selectedCursoId === '' || m.curso.id === this.selectedCursoId;
      const matchesEstado = this.selectedEstado === '' || m.estado === this.selectedEstado;
      return matchesQuery && matchesCurso && matchesEstado;
    });
  }

  openCreate() {
    this.newMatricula = { fecha: new Date().toISOString().slice(0, 10), observaciones: '' };
    // let dialog size to its content but constrain width
    this.dialogRef = this.dialog.open(this.createDialog, { width: '600px', maxHeight: '80vh', panelClass: 'centered-dialog' });
  }

  create() {
    if (!this.newMatricula || !this.newMatricula.estudianteNombre || !this.newMatricula.curso) {
      alert('Completa nombre del estudiante y curso');
      return;
    }
    // call service
    // build payload
    const payload = {
      estudiante: { id: 0, nombre: this.newMatricula.estudianteNombre },
      curso: this.newMatricula.curso,
      fecha: this.newMatricula.fecha
    };
    this.matriculaService.createMatricula(payload).subscribe((m: any) => {
      this.matriculas.unshift(m);
      this.filter();
      this.dialogRef?.close();
    });
  }

  edit(m: MatriculaDTO) {
    this.editingMatricula = { ...m, estudianteNombre: m.estudiante.nombre };
    // let dialog size to its content but constrain width
    this.dialogRef = this.dialog.open(this.editDialog, { width: '600px', maxHeight: '80vh', panelClass: 'centered-dialog' });
  }

  update() {
    if (!this.editingMatricula) return;
    const id = this.editingMatricula.matricula_id;
    const payload = {
      estudiante: { id: this.editingMatricula.estudiante.id || 0, nombre: this.editingMatricula.estudianteNombre },
      curso: this.editingMatricula.curso
    };
    this.matriculaService.updateMatricula(id, payload).subscribe((updated: any) => {
      const idx = this.matriculas.findIndex(x => x.matricula_id === id);
      if (idx !== -1) this.matriculas[idx] = updated;
      this.filter();
      this.dialogRef?.close();
      this.editingMatricula = null;
    });
  }

  delete(m: MatriculaDTO) {
    if (!confirm(`Eliminar matrícula #${m.matricula_id} de ${m.estudiante.nombre}?`)) return;
    this.matriculaService.deleteMatricula(m.matricula_id).subscribe(() => {
      this.matriculas = this.matriculas.filter(x => x.matricula_id !== m.matricula_id);
      this.filter();
    });
  }

  approve(m: MatriculaDTO) {
    if (!confirm(`Aprobar matrícula #${m.matricula_id} de ${m.estudiante.nombre}?`)) return;
    this.matriculaService.approveMatricula(m.matricula_id).subscribe(() => {
      m.estado = 'Activa';
      this.filter();
    });
  }

  reject(m: MatriculaDTO) {
    const motivo = prompt('Motivo del rechazo:');
    if (motivo === null) return;
    this.matriculaService.rejectMatricula(m.matricula_id, motivo).subscribe(() => {
      m.estado = 'Cancelada';
      this.filter();
    });
  }
}

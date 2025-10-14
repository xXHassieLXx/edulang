import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  private cursos = [
    { id: 1, nombre: 'Inglés - Principiantes' },
    { id: 2, nombre: 'Francés Intermedio' },
  ];

  private matriculas = [
    {
      matricula_id: 1,
      estudiante: { id: 1, nombre: 'Juan Pérez', documento: 'DNI 12345678', email: 'juan@example.com' },
      curso: { id: 1, nombre: 'Inglés - Principiantes', nivel: 'A1', idioma: 'Inglés' },
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Activa',
      observaciones: ''
    },
    {
      matricula_id: 2,
      estudiante: { id: 2, nombre: 'María Gómez', documento: 'DNI 87654321', email: 'maria@example.com' },
      curso: { id: 2, nombre: 'Francés Intermedio', nivel: 'B1', idioma: 'Francés' },
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Activa',
      observaciones: ''
    }
  ];

  getMatriculas(): Observable<any[]> {
    return of(this.matriculas);
  }

  getCursos(): Observable<any[]> {
    return of(this.cursos);
  }

  createMatricula(payload: any) {
    const nextId = Math.max(0, ...this.matriculas.map(m => m.matricula_id)) + 1;
    const nuevo = {
      matricula_id: nextId,
      estudiante: payload.estudiante,
      curso: payload.curso,
      fecha: payload.fecha || new Date().toISOString().slice(0, 10),
      estado: 'Activa',
      observaciones: payload.observaciones || ''
    };
    this.matriculas.unshift(nuevo);
    return of(nuevo);
  }

  approveMatricula(id: number) {
    const m = this.matriculas.find(x => x.matricula_id === id);
    if (m) m.estado = 'Activa';
    return of({});
  }

  rejectMatricula(id: number, motivo: string) {
    const m = this.matriculas.find(x => x.matricula_id === id);
    if (m) {
      m.estado = 'Cancelada';
      m.observaciones = motivo;
    }
    return of({});
  }

  updateMatricula(id: number, payload: any): Observable<any> {
    const idx = this.matriculas.findIndex(x => x.matricula_id === id);
    if (idx !== -1) {
      const updated = { ...this.matriculas[idx], estudiante: payload.estudiante, curso: payload.curso };
      this.matriculas[idx] = updated;
      return of(updated);
    }
    return of(null);
  }

  deleteMatricula(id: number): Observable<any> {
    this.matriculas = this.matriculas.filter(x => x.matricula_id !== id);
    return of({});
  }
}

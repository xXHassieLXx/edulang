import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private pagos = [
    {
      pago_id: 1,
      matricula: { matricula_id: 1, estudianteNombre: 'Juan Pérez', cursoNombre: 'Inglés - Principiantes' },
      concepto: 'Inscripcion',
      monto: 50.0,
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Pendiente'
    },
    {
      pago_id: 2,
      matricula: { matricula_id: 2, estudianteNombre: 'María Gómez', cursoNombre: 'Francés Intermedio' },
      concepto: 'Mensualidad',
      monto: 30.0,
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Pagado'
    }
  ];

  getPagos(): Observable<any[]> {
    return of(this.pagos);
  }

  createPago(payload: any): Observable<any> {
    const nextId = Math.max(0, ...this.pagos.map(p => p.pago_id)) + 1;
    const nuevo = {
      pago_id: nextId,
      matricula: { matricula_id: payload.matricula_id, estudianteNombre: payload.estudianteNombre || 'Alumno', cursoNombre: payload.cursoNombre || 'Curso' },
      concepto: payload.concepto,
      monto: payload.monto,
      fecha: payload.fecha || new Date().toISOString().slice(0, 10),
      estado: 'Pendiente'
    };
    this.pagos.unshift(nuevo);
    return of(nuevo);
  }

  markPaid(id: number): Observable<any> {
    const p = this.pagos.find(x => x.pago_id === id);
    if (p) p.estado = 'Pagado';
    return of({});
  }

  deletePago(id: number): Observable<any> {
    this.pagos = this.pagos.filter(x => x.pago_id !== id);
    return of({});
  }

  updatePago(id: number, payload: any): Observable<any> {
    const idx = this.pagos.findIndex(x => x.pago_id === id);
    if (idx !== -1) {
      const updated = { ...this.pagos[idx], ...payload };
      this.pagos[idx] = updated;
      return of(updated);
    }
    return of(null);
  }
}

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
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { PagoService } from '../../../services/pago.service';

interface PagoDTO {
  pago_id: number;
  matricula: { matricula_id: number; estudianteNombre: string; cursoNombre: string };
  concepto: 'Inscripcion' | 'Mensualidad';
  monto: number;
  fecha: string;
  estado: 'Pendiente' | 'Pagado';
}

@Component({
  selector: 'app-gestion-pagos',
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
    MatTableModule,
    MatBadgeModule,
  ],
  templateUrl: './gestion-pagos.component.html',
  styleUrls: ['./gestion-pagos.component.scss'],
})
export class GestionPagosComponent implements OnInit {
  pagos: PagoDTO[] = [];
  filtered: PagoDTO[] = [];

  query: string = '';
  selectedEstado: string = '';
  selectedConcepto: string = '';

  @ViewChild('createDialog') createDialog!: TemplateRef<any>;
  private dialogRef?: MatDialogRef<any>;

  newPago: any = { concepto: 'Mensualidad', monto: 0, fecha: new Date().toISOString().slice(0, 10) };

  constructor(private pagoService: PagoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.pagoService.getPagos().subscribe((p: any[]) => {
      this.pagos = p;
      this.filtered = [...this.pagos];
    });
  }

  filter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = this.pagos.filter((p) => {
      const matchesQuery = q === '' || [p.matricula.estudianteNombre, p.matricula.cursoNombre].some((f: string) => f.toLowerCase().includes(q));
      const matchesEstado = this.selectedEstado === '' || p.estado === this.selectedEstado;
      const matchesConcepto = this.selectedConcepto === '' || p.concepto === this.selectedConcepto;
      return matchesQuery && matchesEstado && matchesConcepto;
    });
  }

  openCreate() {
    this.newPago = { concepto: 'Mensualidad', monto: 0, fecha: new Date().toISOString().slice(0, 10) };
    this.dialogRef = this.dialog.open(this.createDialog, { width: '600px', maxHeight: '80vh', panelClass: 'centered-dialog' });
  }

  create() {
    if (!this.newPago.monto || !this.newPago.concepto || !this.newPago.matriculaId) {
      alert('Completa concepto, monto y matrícula');
      return;
    }
    const payload = {
      matricula_id: this.newPago.matriculaId,
      concepto: this.newPago.concepto,
      monto: Number(this.newPago.monto),
      fecha: this.newPago.fecha,
    };
    this.pagoService.createPago(payload).subscribe((created: any) => {
      this.pagos.unshift(created);
      this.filter();
      this.dialogRef?.close();
    });
  }

  markPaid(p: PagoDTO) {
    if (!confirm(`Marcar pago #${p.pago_id} como pagado?`)) return;
    this.pagoService.markPaid(p.pago_id).subscribe(() => {
      p.estado = 'Pagado';
      this.filter();
    });
  }

  delete(p: PagoDTO) {
    if (!confirm(`Eliminar pago #${p.pago_id}?`)) return;
    this.pagoService.deletePago(p.pago_id).subscribe(() => {
      this.pagos = this.pagos.filter(x => x.pago_id !== p.pago_id);
      this.filter();
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDocenteDto } from '../models/dto/cursoDocenteDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient : HttpClient
  ) {}

  getAllCursosWithDocente() : Observable<CursoDocenteDto[]> {
    return this.httpClient.get<CursoDocenteDto[]>(`${this.apiUrl}/curso/getAllWithDocente`);
  }
}

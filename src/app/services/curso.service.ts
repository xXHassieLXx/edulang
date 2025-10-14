import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { CursoDocenteDto } from '../models/dto/cursoDocenteDto.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/EduLang_war_exploded/api/curso/getAllWithDocente'

  constructor(
    private httpClient : HttpClient
  ) {}

  getAllCursosWithDocente() : Observable<CursoDocenteDto[]> {
    return this.httpClient.get<CursoDocenteDto[]>(this.apiUrl);
  }
}

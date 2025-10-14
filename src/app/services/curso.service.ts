import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/EduLang_war_exploded/api/curso/getAll'

  constructor(
    private httpClient : HttpClient
  ) {}

  getAllCursos() : Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.apiUrl);
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'admin/cursos',
    loadComponent: () => import('./components/administrador/gestion-cursos/gestion-cursos.component').then(m => m.GestionCursosComponent),
  },
  {
    path: 'admin/matriculas',
    loadComponent: () => import('./components/administrador/gestion-matriculas/gestion-matriculas.component').then(m => m.GestionMatriculasComponent),
  },
  {
    path: '',
    redirectTo: 'admin/cursos',
    pathMatch: 'full',
  },
];

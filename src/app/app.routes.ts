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
    path: '',
    redirectTo: 'admin/cursos',
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'gestion',
    loadComponent: () => import('./gestion/gestion.page').then((m) => m.GestionPage),
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./configuracion/configuracion.page').then((m) => m.ConfiguracionPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
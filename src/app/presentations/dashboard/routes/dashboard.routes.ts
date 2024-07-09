import { Routes } from '@angular/router';

import { DashboardComponent } from '../containers/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'landing',
        loadComponent: () =>
          import('../containers/landing.component').then(
            m => m.LandingComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('../containers/about.component').then(m => m.AboutComponent),
      },
    ],
  },
];

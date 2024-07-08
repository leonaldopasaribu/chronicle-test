import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/presentations/dashboard/routes/dashboard.routes').then(
        m => m.routes,
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

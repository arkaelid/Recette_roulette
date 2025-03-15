import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent,
        data: { animation: 'login' }
    },
    { 
        path: 'mes-recettes', 
        loadComponent: () => import('./mes-recettes/mes-recettes.component').then(m => m.MesRecettesComponent),
        canActivate: [AuthGuard],
        data: { animation: 'mes-recettes' }
    },
    { 
        path: '', 
        redirectTo: '/accueil', 
        pathMatch: 'full' 
    },
    { 
        path: 'accueil',
        loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent),
        data: { animation: 'accueil' }
    }
];

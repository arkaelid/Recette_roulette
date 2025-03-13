import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: 'mes-recettes', 
        loadComponent: () => import('./mes-recettes/mes-recettes.component').then(m => m.MesRecettesComponent),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { 
        path: 'accueil',
        loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent)
    }
];

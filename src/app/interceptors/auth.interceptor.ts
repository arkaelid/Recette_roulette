import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('token');
  
  // Si un token existe, l'ajouter à l'en-tête Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // Continuer avec la requête modifiée et gérer les erreurs
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Gérer les erreurs d'authentification (401, 403)
      if (error.status === 401 || error.status === 403) {
        // Supprimer le token et rediriger vers la page de connexion
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}; 
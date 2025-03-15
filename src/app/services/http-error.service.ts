import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }

  /**
   * Gestion des erreurs HTTP
   * @param error - Erreur HTTP
   * @returns Observable avec l'erreur
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.status === 0) {
        errorMessage = 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.';
      } else if (error.status === 401) {
        errorMessage = 'Accès non autorisé. Veuillez vous connecter.';
      } else if (error.status === 403) {
        errorMessage = 'Accès interdit. Vous n\'avez pas les droits nécessaires.';
      } else if (error.status === 404) {
        errorMessage = 'Ressource non trouvée.';
      } else if (error.status === 500) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
      }
    }

    console.error('Erreur HTTP:', error);
    return throwError(() => new Error(errorMessage));
  }
} 
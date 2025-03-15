import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecettesService {
  private apiUrl = 'http://localhost:3000/api/recettes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtenir les headers avec le token d'authentification
   * @returns HttpHeaders avec le token d'authentification
   */
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Générer une recette aléatoire
   * @param nombrePersonnes - Nombre de personnes pour la recette (2, 4 ou 6)
   * @returns Observable avec les informations de la recette
   */
  genererRecetteAleatoire(nombrePersonnes: number = 2): Observable<any> {
    const params = new HttpParams().set('personnes', nombrePersonnes.toString());
    return this.http.get<any>(`${this.apiUrl}/aleatoire`, { params });
  }

  /**
   * Obtenir les recettes de l'utilisateur (nécessite authentification)
   * @returns Observable avec les recettes de l'utilisateur
   */
  getMesRecettes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mes-recettes`, { headers: this.getHeaders() });
  }

  /**
   * Obtenir une recette par son ID
   * @param id - ID de la recette
   * @param nombrePersonnes - Nombre de personnes pour la recette (2, 4 ou 6)
   * @returns Observable avec les informations de la recette
   */
  getRecetteById(id: number, nombrePersonnes: number = 2): Observable<any> {
    const params = new HttpParams().set('personnes', nombrePersonnes.toString());
    return this.http.get<any>(`${this.apiUrl}/${id}`, { params });
  }

  /**
   * Modifier le nombre de personnes pour une recette
   * @param recetteId - ID de la recette
   * @param nombrePersonnes - Nouveau nombre de personnes (2, 4 ou 6)
   * @returns Observable avec les ingrédients mis à jour
   */
  modifierNombrePersonnes(recetteId: number, nombrePersonnes: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${recetteId}/personnes`, 
      { nombrePersonnes }, 
      { headers: this.getHeaders() }
    );
  }
} 
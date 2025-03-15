import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

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
   * Générer une liste de courses à partir de recettes
   * @param recettesIds - Tableau d'IDs de recettes
   * @returns Observable avec la liste de courses générée
   */
  genererListeCourses(recettesIds: number[]): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/generer`, 
      { recettesIds }, 
      { headers: this.getHeaders() }
    );
  }

  /**
   * Obtenir toutes les listes de courses de l'utilisateur
   * @returns Observable avec les listes de courses
   */
  getMesListes(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Obtenir une liste de courses par son ID
   * @param listeId - ID de la liste de courses
   * @returns Observable avec les détails de la liste
   */
  getListeById(listeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${listeId}`, { headers: this.getHeaders() });
  }

  /**
   * Modifier un élément de la liste de courses
   * @param listeId - ID de la liste de courses
   * @param elementId - ID de l'élément à modifier
   * @param modifications - Modifications à appliquer (est_coche et/ou quantite)
   * @returns Observable avec l'élément modifié
   */
  modifierElement(listeId: number, elementId: number, modifications: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${listeId}/elements/${elementId}`, 
      modifications, 
      { headers: this.getHeaders() }
    );
  }

  /**
   * Ajouter un élément à la liste de courses
   * @param listeId - ID de la liste de courses
   * @param element - Élément à ajouter (nom_personnalise, quantite, unite)
   * @returns Observable avec l'élément ajouté
   */
  ajouterElement(listeId: number, element: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${listeId}/elements`, 
      element, 
      { headers: this.getHeaders() }
    );
  }

  /**
   * Supprimer un élément de la liste de courses
   * @param listeId - ID de la liste de courses
   * @param elementId - ID de l'élément à supprimer
   * @returns Observable avec le message de confirmation
   */
  supprimerElement(listeId: number, elementId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${listeId}/elements/${elementId}`, 
      { headers: this.getHeaders() }
    );
  }
} 
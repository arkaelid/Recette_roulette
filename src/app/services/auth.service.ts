import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  /**
   * Connexion d'un utilisateur
   * @param identifiant - Identifiant de l'utilisateur
   * @param mot_de_passe - Mot de passe de l'utilisateur
   * @returns Observable avec les informations de l'utilisateur et le token
   */
  login(identifiant: string, mot_de_passe: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { identifiant, mot_de_passe })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  /**
   * Inscription d'un nouvel utilisateur
   * @param identifiant - Identifiant de l'utilisateur
   * @param mot_de_passe - Mot de passe de l'utilisateur
   * @returns Observable avec les informations de l'utilisateur et le token
   */
  register(identifiant: string, mot_de_passe: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { identifiant, mot_de_passe })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   * @returns Observable avec l'état d'authentification
   */
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Récupérer l'utilisateur courant
   * @returns Observable avec les informations de l'utilisateur
   */
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Récupérer le token JWT
   * @returns Token JWT ou null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Vérifier la validité du token
   * @returns Observable avec les informations de l'utilisateur
   */
  verifyToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify`);
  }
}

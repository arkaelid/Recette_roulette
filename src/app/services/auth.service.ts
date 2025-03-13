import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // Pour l'exemple, on utilise un utilisateur en dur
    // Dans un vrai projet, cela devrait être vérifié avec une API
    if (email === 'test@test.com' && password === 'password123') {
      const user = { email, name: 'Utilisateur Test' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}

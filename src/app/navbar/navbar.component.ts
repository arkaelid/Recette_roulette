import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      auth => this.isAuthenticated = auth
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  // Fermer le menu mobile lors d'un clic à l'extérieur
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const navbar = document.querySelector('.navbar');
    
    if (navbar && !navbar.contains(target) && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}

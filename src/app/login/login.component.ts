import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode = true;
  loading = false;
  errorMessage = '';
  animationDone = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    // Formulaire de connexion
    this.loginForm = this.fb.group({
      identifiant: ['', [Validators.required, Validators.minLength(3)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulaire d'inscription
    this.registerForm = this.fb.group({
      identifiant: ['', [Validators.required, Validators.minLength(3)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('mot_de_passe')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  toggleMode(): void {
    if (!this.animationDone) return;
    
    this.animationDone = false;
    this.errorMessage = '';
    
    // Réinitialiser le formulaire approprié avant de changer de mode
    if (this.isLoginMode) {
      this.registerForm.reset();
    } else {
      this.loginForm.reset();
    }
    
    setTimeout(() => {
      this.isLoginMode = !this.isLoginMode;
      setTimeout(() => {
        this.animationDone = true;
      }, 300); // Durée de l'animation
    }, 10);
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    const { identifiant, mot_de_passe } = this.loginForm.value;
    
    this.authService.login(identifiant, mot_de_passe).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Connexion réussie:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur de connexion:', error);
        this.errorMessage = error.error?.message || 'Identifiant ou mot de passe incorrect';
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    const { identifiant, mot_de_passe } = this.registerForm.value;
    
    this.authService.register(identifiant, mot_de_passe).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Inscription réussie:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur d\'inscription:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}

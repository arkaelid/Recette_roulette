# Recette Roulette 🍔

Une application web moderne pour découvrir de nouvelles recettes de façon aléatoire et sortir de votre zone de confort culinaire !

![Recette Roulette](assets/images/logo.png)

## 📋 Présentation

Recette Roulette est une application qui vous permet de découvrir des recettes au hasard, de les sauvegarder dans vos favoris et de filtrer selon vos préférences. L'application est conçue avec un design coloré inspiré des burgers, avec des animations fluides et une expérience utilisateur intuitive.

## ✨ Fonctionnalités

- **Découverte aléatoire** : Trouvez de nouvelles recettes au hasard pour sortir de votre zone de confort culinaire
- **Gestion des recettes** : Retrouvez facilement vos recettes des trois dernières semaines
- **Filtrage personnalisé** : Filtrez les recettes selon le nombre de personnes à votre table
- **Authentification** : Créez un compte pour sauvegarder vos recettes préférées
- **Design responsive** : Interface adaptée à tous les appareils (desktop, tablette, mobile)

## 🎨 Design

L'application utilise un thème coloré inspiré des burgers avec :

- **Palette de couleurs** :
  - Orange burger (primary-color) : #FF6B35
  - Jaune fromage (accent-color) : #FFCA3A
  - Vert salade (secondary-color) : #5C946E
  - Fond blanc cassé : #FFF8F0
  - Texte presque noir : #2E282A

- **Animations** :
  - Transitions fluides sur les boutons et les liens
  - Effet d'underline progressif sur les liens
  - Animation de flottement sur les images
  - Effets de survol sur les cartes et les boutons

- **Composants** :
  - Navbar responsive avec menu mobile
  - Footer avec liens de navigation et icônes sociales
  - Formulaire de connexion animé
  - Cartes de fonctionnalités interactives

## 🛠️ Technologies utilisées

- **Frontend** : Angular 17 (standalone components)
- **Styles** : CSS personnalisé (variables CSS pour le thème)
- **Icônes** : Font Awesome
- **Polices** : Google Fonts (Poppins)

## 🚀 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)
- Angular CLI (v17 ou supérieur)

### Étapes d'installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/recette-roulette.git
cd recette-roulette
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
ng serve
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:4200`

## 📱 Structure du projet

```
recette-roulette/
├── src/
│   ├── app/
│   │   ├── accueil/             # Page d'accueil
│   │   ├── login/               # Page de connexion
│   │   ├── mes-recettes/        # Page des recettes de l'utilisateur
│   │   ├── navbar/              # Composant de la barre de navigation
│   │   ├── footer/              # Composant du pied de page
│   │   ├── services/            # Services (authentification, etc.)
│   │   ├── guards/              # Guards pour la protection des routes
│   │   └── ...
│   ├── assets/                  # Images, icônes, etc.
│   └── styles.css               # Styles globaux
└── ...
```

## 🔒 Authentification

L'application utilise un système d'authentification simple avec :
- Connexion par email/mot de passe
- Protection des routes avec des guards Angular
- Gestion des sessions utilisateur

## 🌐 Déploiement

Pour déployer l'application en production :

```bash
ng build --prod
```

Les fichiers générés se trouveront dans le dossier `dist/` et pourront être déployés sur n'importe quel serveur web statique.

## 📝 Contact

Pour toute question ou demande d'accès, contactez-nous à :
contact@sullivan-jarry.fr

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 💾 Base de données

Le schéma de la base de données se trouve dans le fichier `database/schema_bdd.sql`. Pour initialiser la base de données :

```bash
# Pour PostgreSQL
psql -U username -d database_name -f database/schema_bdd.sql
```

Pour charger les données de test :

```bash
# Pour PostgreSQL
psql -U username -d database_name -f database/seed_data.sql
```

Le modèle de données comprend les tables suivantes :
- `utilisateurs` : Informations des utilisateurs
- `recettes` : Détails des recettes
- `ingredients` : Liste des ingrédients disponibles
- `recette_ingredients` : Association entre recettes et ingrédients avec quantités pour différentes portions
- `recettes_utilisateurs` : Recettes générées pour les utilisateurs
- `listes_courses` : Listes de courses des utilisateurs
- `elements_liste` : Éléments des listes de courses
- `liste_recettes` : Association entre listes de courses et recettes

Le schéma inclut également des fonctions PostgreSQL pour :
- Générer une recette aléatoire
- Calculer les quantités d'ingrédients en fonction du nombre de personnes
- Générer une liste de courses à partir des recettes sélectionnées

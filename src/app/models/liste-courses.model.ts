import { Recette } from './recette.model';

export interface ElementListe {
  id: number;
  liste_id: number;
  ingredient_id?: number;
  nom?: string;
  nom_personnalise?: string;
  quantite: number;
  unite: string;
  categorie?: string;
  est_coche: boolean;
}

export interface ListeCourses {
  id: number;
  utilisateur_id: number;
  nom: string;
  date_creation: Date;
  elements: ElementListe[];
  recettes: {
    recette_id: number;
    liste_id: number;
    nombre_personnes: number;
    nom: string;
    image_url: string;
    categorie: string;
  }[];
} 
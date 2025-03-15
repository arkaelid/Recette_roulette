export interface Ingredient {
  id: number;
  nom: string;
  quantite: number;
  unite_mesure: string;
  categorie: string;
}

export interface Recette {
  id: number;
  nom: string;
  description: string;
  temps_preparation: number;
  temps_cuisson: number;
  difficulte: string;
  categorie: string;
  image_url: string;
  instructions: string;
  nombre_personnes: number;
  ingredients: Ingredient[];
  date_creation?: Date;
  generation_id?: number;
  semaine_generation?: string;
} 
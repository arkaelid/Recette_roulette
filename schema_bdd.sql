-- Schéma de base de données PostgreSQL pour Recette Roulette

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    identifiant VARCHAR(50) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL, -- Stocké avec hachage
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des recettes
CREATE TABLE recettes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    temps_preparation INT, -- en minutes
    temps_cuisson INT, -- en minutes
    difficulte VARCHAR(20), -- facile, moyen, difficile
    image_url VARCHAR(255),
    categorie VARCHAR(50) -- entrée, plat, dessert, etc.
);

-- Table des ingrédients
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    unite_mesure VARCHAR(20), -- g, ml, cuillère à soupe, etc.
    categorie VARCHAR(50) -- légume, viande, épice, etc.
);

-- Table de liaison entre recettes et ingrédients avec quantités pour différentes portions
CREATE TABLE recette_ingredients (
    recette_id INT REFERENCES recettes(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
    quantite_2_personnes DECIMAL(10, 2),
    quantite_4_personnes DECIMAL(10, 2),
    quantite_6_personnes DECIMAL(10, 2),
    PRIMARY KEY (recette_id, ingredient_id)
);

-- Table des recettes générées pour les utilisateurs
CREATE TABLE recettes_utilisateurs (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateurs(id) ON DELETE CASCADE,
    recette_id INT REFERENCES recettes(id) ON DELETE CASCADE,
    nombre_personnes INT NOT NULL DEFAULT 2,
    date_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    semaine_generation INT GENERATED ALWAYS AS (EXTRACT(WEEK FROM date_generation)) STORED
);

-- Table des listes de courses
CREATE TABLE listes_courses (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateurs(id) ON DELETE CASCADE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nom VARCHAR(100) DEFAULT 'Liste de courses'
);

-- Table des éléments de la liste de courses
CREATE TABLE elements_liste (
    id SERIAL PRIMARY KEY,
    liste_id INT REFERENCES listes_courses(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE SET NULL,
    nom_personnalise VARCHAR(100), -- Au cas où l'utilisateur ajoute un élément qui n'est pas un ingrédient
    quantite DECIMAL(10, 2),
    unite VARCHAR(20),
    est_coche BOOLEAN DEFAULT FALSE -- Pour marquer les éléments déjà achetés
);

-- Table de liaison entre listes de courses et recettes
CREATE TABLE liste_recettes (
    liste_id INT REFERENCES listes_courses(id) ON DELETE CASCADE,
    recette_id INT REFERENCES recettes(id) ON DELETE CASCADE,
    nombre_personnes INT NOT NULL DEFAULT 2,
    PRIMARY KEY (liste_id, recette_id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_recettes_utilisateurs_date ON recettes_utilisateurs(date_generation);
CREATE INDEX idx_recettes_utilisateurs_utilisateur ON recettes_utilisateurs(utilisateur_id);
CREATE INDEX idx_recettes_utilisateurs_semaine ON recettes_utilisateurs(semaine_generation);
CREATE INDEX idx_elements_liste_liste ON elements_liste(liste_id);

-- Fonction pour générer une recette aléatoire
CREATE OR REPLACE FUNCTION generer_recette_aleatoire()
RETURNS INT AS $$
DECLARE
    recette_id INT;
BEGIN
    -- Sélectionne une recette aléatoire
    SELECT id INTO recette_id FROM recettes ORDER BY RANDOM() LIMIT 1;
    RETURN recette_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour calculer la quantité d'ingrédients en fonction du nombre de personnes
CREATE OR REPLACE FUNCTION calculer_quantite(
    p_recette_id INT,
    p_ingredient_id INT,
    p_nombre_personnes INT
) RETURNS DECIMAL AS $$
DECLARE
    quantite DECIMAL;
BEGIN
    IF p_nombre_personnes <= 2 THEN
        SELECT quantite_2_personnes INTO quantite 
        FROM recette_ingredients 
        WHERE recette_id = p_recette_id AND ingredient_id = p_ingredient_id;
    ELSIF p_nombre_personnes <= 4 THEN
        SELECT quantite_4_personnes INTO quantite 
        FROM recette_ingredients 
        WHERE recette_id = p_recette_id AND ingredient_id = p_ingredient_id;
    ELSE
        SELECT quantite_6_personnes INTO quantite 
        FROM recette_ingredients 
        WHERE recette_id = p_recette_id AND ingredient_id = p_ingredient_id;
    END IF;
    
    RETURN quantite;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour générer une liste de courses à partir des recettes sélectionnées
CREATE OR REPLACE FUNCTION generer_liste_courses(
    p_utilisateur_id INT,
    p_recettes_ids INT[]
) RETURNS INT AS $$
DECLARE
    liste_id INT;
    recette_id INT;
BEGIN
    -- Créer une nouvelle liste de courses
    INSERT INTO listes_courses (utilisateur_id) VALUES (p_utilisateur_id) RETURNING id INTO liste_id;
    
    -- Pour chaque recette, ajouter les ingrédients à la liste
    FOREACH recette_id IN ARRAY p_recettes_ids LOOP
        -- Ajouter la recette à la liste
        INSERT INTO liste_recettes (liste_id, recette_id) VALUES (liste_id, recette_id);
        
        -- Ajouter les ingrédients de la recette à la liste
        INSERT INTO elements_liste (liste_id, ingredient_id, quantite, unite)
        SELECT 
            liste_id, 
            ri.ingredient_id, 
            ri.quantite_2_personnes, -- Par défaut pour 2 personnes, à ajuster selon le besoin
            i.unite_mesure
        FROM recette_ingredients ri
        JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE ri.recette_id = recette_id;
    END LOOP;
    
    RETURN liste_id;
END;
$$ LANGUAGE plpgsql; 
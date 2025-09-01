export interface Article {
  id: number;
  titre: string;
  contenu: string;
  illustration: string;
  illustration_url: string;
  date_pub: string;
  auteur: any;
  sous_categorie: any;
  model3d_url?: string;
  like_count?: number;
}

export interface Categorie {
  id: number;
  libelle: string;
  est_public: boolean;
  centre_interet: number;
}

export interface SousCategorie {
  id: number;
  libelle: string;
  categorie: number;
}

export interface CentreInteret {
  id: number;
  libelle: string;
}

export interface ArticlesBySousCategorie {
  sousCategorie: SousCategorie;
  articles:  Article [];
}

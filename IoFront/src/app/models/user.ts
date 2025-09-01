import { Article, SousCategorie } from "./article";

export interface User {
  id: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  age: number;
  adresse: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  age: number;
  adresse: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

// Nouvelle interface pour les articles groupés par sous-catégorie
export interface ArticlesBySousCategorie {
  sousCategorie: SousCategorie;
  articles: Article[];
}
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
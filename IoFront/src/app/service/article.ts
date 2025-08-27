export interface Article {
    id: number;
    titre: string;
    contenu: string;
    illustration: string;
    date_pub: string;
    auteur: {
        id: number;
        nom: string;
        prenom: string;
        age: number;
    };
}

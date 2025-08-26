export interface Article {
    id: number;
    titre: string;
    contenu: string;
    illustration: string;
    date_pub: string;
    auteur: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
    };
}

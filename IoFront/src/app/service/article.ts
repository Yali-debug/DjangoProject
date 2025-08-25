export interface Article {
    id: number;
    titre: string;
    contenu: string;
    image: string;
    date_publication: string;
    auteur: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
    };
}

from rest_framework import viewsets, permissions, status
from gestion_articles.models import *
from .serializers import *

class CentreInteretViewSet(viewsets.ModelViewSet):
    queryset = CentreInteret.objects.all()
    serializer_class = CentreInteretSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SousCategorieViewSet(viewsets.ModelViewSet):
    serializer_class = SousCategorieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = SousCategorie.objects.all()
        categorie_id = self.request.query_params.get('categorie_id')
        if categorie_id:
            queryset = queryset.filter(categorie_id=categorie_id)
        return queryset

class UtilisateurViewSet(viewsets.ModelViewSet):
    serializer_class = UtilisateurSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        # Les utilisateurs ne peuvent voir que leur propre profil en détail
        if self.action == 'retrieve' and self.request.user.is_authenticated:
            return Utilisateur.objects.filter(user=self.request.user)
        return Utilisateur.objects.all()

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Article.objects.all()
        sous_categorie_id = self.request.query_params.get('sous_categorie_id')
        if sous_categorie_id:
            queryset = queryset.filter(sous_categorie_id=sous_categorie_id)
        return queryset

class ConsulteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ConsulteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Consulte.objects.filter(utilisateur__user=self.request.user).select_related('article')

class AbonnementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user subscriptions to categories.
    """
    serializer_class = AbonnementSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return self.request.user.utilisateur.abonnements.all()
    
    def perform_create(self, serializer):
        utilisateur = Utilisateur.objects.get(user=self.request.user)
        serializer.save(utilisateur=utilisateur)
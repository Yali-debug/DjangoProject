# from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions, viewsets
from rest_framework.exceptions import PermissionDenied
from gestion_articles.models import *
from .serializers import *
from .permissions import IsAuteurOrAdmin


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all.order_by('-date_pub')
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        # Assigner automatiquement l'auteur connecté
        serializer.save(auteur=self.request.user)
    
    def get_permissions(self):
        """Définir les permissions pour les actions spécifiques"""
        if self.action in ['list', 'retrieve']:
            permissions = [permissions.IsAuthenticated]
        elif self.action == "create":
            permissions = [permissions.IsAuthenticated]
        else:
            permissions = [IsAuteurOrAdmin]
        return [permission() for permission in permissions]
        




class ConsulteViewSet(viewsets.ModelViewSet):
    queryset = Consulte.objects.all.order_by('-date_consultation')
    serializer_class = ConsulteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Quand un utilisateur consulte un article :
        serializer.save(utilisateur=self.request.user)



class CentreInteretViewSet(viewsets.ModelViewSet):
    queryset = CentreInteret.objects.all()
    serializer_class = CentreInteretSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None  # Désactiver si la liste est courte

    def perform_create(self, serializer):
        # Assigner automatiquement l'utilisateur connecté
        serializer.save(utilisateur=self.request.user)

    @action(detail=True, methods=['get'])
    def abonnements(self, request, pk=None):
        centre_interet = self.get_object()
        abonnements = Abonnement.objects.filter(centre_interet=centre_interet)
        serializer = AbonnementSerializer(abonnements, many=True)
        return Response(serializer.data)




class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    
    # lectture autorisé mais modification seulement aux admins
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Seuls les administrateurs peuvent créer des catégories")
        serializer.save()



class SousCategorieViewSet(viewsets.ModelViewSet):
    queryset = SousCategorie.objects.select_related('categorie')
    serializer_class = SousCategorieSerializer
    
    def get_queryset(self):
        """Filtrage optionnel par catégorie parente"""
        queryset = super().get_queryset()
        categorie_id = self.request.query_params.get('categorie_id')
        if categorie_id:
            queryset = queryset.filter(categorie_id=categorie_id)
        return queryset


class AbonnementViewSet(viewsets.ModelViewSet):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Assigner automatiquement l'utilisateur connecté
        serializer.save(utilisateur=self.request.user)


class ArticleViewSet(viewsets.ModelViewSet):
    # ... (votre code existant)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        article = self.get_object()
        like, created = Like.objects.get_or_create(
            utilisateur=request.user,
            article=article
        )
        if not created:
            like.delete()
            return Response({'status': 'like removed'})
        return Response({'status': 'like added'})
    
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Assigner automatiquement l'utilisateur connecté
        serializer.save(utilisateur=self.request.user)


class CommentaireViewSet(viewsets.ModelViewSet):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Assigner automatiquement l'utilisateur connecté
        serializer.save(utilisateur=self.request.user)



class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Assigner automatiquement l'utilisateur connecté
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        """Filtrage optionnel par nom ou prénom"""
        queryset = super().get_queryset()
        nom = self.request.query_params.get('nom')
        prenom = self.request.query_params.get('prenom')
        if nom:
            queryset = queryset.filter(nom__icontains=nom)
        if prenom:
            queryset = queryset.filter(prenom__icontains=prenom)
        return queryset

# Create your views here.

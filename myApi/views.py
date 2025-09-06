from rest_framework import status, generics, permissions, viewsets
from rest_framework.decorators import api_view, action
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

class CentreInteretViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CentreInteretSerializer
    permission_classes = [permissions.AllowAny]
    queryset = CentreInteret.objects.all()


class CategorieViewSet(viewsets.ModelViewSet):
    serializer_class = CategorieSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Categorie.objects.all()
    

class SousCategorieViewSet(viewsets.ModelViewSet):
    serializer_class = SousCategorieSerializer
    permission_classes = [permissions.AllowAny]
    queryset = SousCategorie.objects.all()


class UtilisateurViewSet(viewsets.ModelViewSet):
    serializer_class = UtilisateurDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        # Les utilisateurs ne peuvent voir que leur propre profil en détail
        if self.request.user.is_authenticated:
            return Utilisateur.objects.filter(user=self.request.user)
        return Utilisateur.objects.none()
    
    def get_object(self):
        return self.request.user.utilisateur

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        queryset = Article.objects.all().select_related (
            'auteur',
            'sous_categorie',
        ).prefetch_related(
            'likes',
            'commentaires'
        )
        return queryset
    
    def perform_create(self, serializer):
        try:
            utilisateur = self.request.user.utilisateur
        except Utilisateur.DoesNotExist:
            utilisateur =None

        if self.request.user.is_staff:
            serializer.save(auteur=utilisateur)
        else:
            serializer.save(auteur=utilisateur)

    def get_serializer_context(self):
        return {'request': self.request}
    
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def commenter(self, request, pk=None):
        article = self.get_object()
        utilisateur = request.user.utilisateur
        contenu = request.data.get('contenu')
        if not contenu:
            return Response({'error': 'Le contenu du commentaire est requis.'}, status=status.HTTP_400_BAD_REQUEST)
        commentaire = Commentaire.objects.create(article=article, utilisateur=utilisateur, contenu=contenu)
        return Response({'contenu': commentaire.contenu}, status=status.HTTP_201_CREATED)

     
    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def like(self, request, pk=None):
        article = self.get_object()
        utilisateur = request.user.utilisateur
        like, created = Like.objects.get_or_create(utilisateur=utilisateur, article=article)
        if not created:
            like.delete()
        return Response({'like_count': article.likes.count()})


class ConsulteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ConsulteSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Consulte.objects.filter(utilisateur__user=self.request.user).select_related('article')


class AbonnementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user subscriptions to categories.
    """
    serializer_class = AbonnementSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Abonnement.objects.all()

class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        utilisateur = serializer.save()  # Retourne le profil créé

        # Sérialisation du profil pour la réponse
        profil_serializer = UtilisateurDetailSerializer(utilisateur, context={'request': request})

        return Response({
            "detail": "Utilisateur créé avec succès",
            "utilisateur": profil_serializer.data
        }, status=status.HTTP_201_CREATED)

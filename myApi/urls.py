from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path

router = DefaultRouter()
router.register(r'centre_interet', CentreInteretViewSet, basename='centre_interet')
router.register(r'categorie', CategorieViewSet, basename='categorie')
router.register(r'sous_categorie', SousCategorieViewSet, basename='sous_categorie')
router.register(r'utilisateur', UtilisateurViewSet, basename='utilisateur')
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'abonnement', AbonnementViewSet, basename='abonnement')
urlpatterns =[
    path('register/', UserRegistrationAPIView.as_view(), name='api_register'),
]
urlpatterns += router.urls

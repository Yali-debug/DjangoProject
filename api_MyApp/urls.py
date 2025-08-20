from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'centres_interet', CentreInteretViewSet, basename='centre_interet')
router.register(r'categories', CategorieViewSet, basename='categorie')
router.register(r'sous_categories', SousCategorieViewSet, basename='sous_categorie')
router.register(r'utilisateurs', UtilisateurViewSet, basename='utilisateur')
router.register(r'articles', ArticleViewSet, basename='article')
urlpatterns = router.urls
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'centre_interet', CentreInteretViewSet, basename='centre_interet')
router.register(r'categorie', CategorieViewSet, basename='categorie')
router.register(r'sous_categorie', SousCategorieViewSet, basename='sous_categorie')
router.register(r'utilisateur', UtilisateurViewSet, basename='utilisateur')
router.register(r'article', ArticleViewSet, basename='article')
urlpatterns = router.urls

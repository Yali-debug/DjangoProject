from django.contrib import admin

# Register your models here.
from . models import *


admin.site.register(CentreInteret)

@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display=('user', 'nom', 'prenom', 'age', 'adresse')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('titre', 'auteur', 'date_pub', 'sous_categorie')
    search_fields = ('titre', 'contenu')
    list_filter = ('sous_categorie', 'date_pub')

@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display = ('libelle', 'est_public', 'centre_interet')
    search_fields = ('libelle',)
    list_filter = ('est_public', 'centre_interet')

@admin.register(SousCategorie)
class SousCategorieAdmin(admin.ModelAdmin):
    list_display = ('libelle', 'categorie')
    search_fields = ('libelle',)
    list_filter = ('categorie',)
@admin.register(Abonnement)
class AbonnementAdmin(admin.ModelAdmin):
    list_display = ('utilisateur', 'centre_interet')
    search_fields = ('utilisateur__nom', 'centre_interet__libelle')
    list_filter = ('centre_interet',)

@admin.register(Consulte)
class ConsulteAdmin(admin.ModelAdmin):
    list_display = ('utilisateur', 'article', 'date_consultation')
    search_fields = ('utilisateur__nom', 'article__titre')
    list_filter = ('date_consultation',)

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('utilisateur', 'article', 'date_like')
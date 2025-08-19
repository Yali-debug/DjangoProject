from django.contrib import admin

# Register your models here.
from . models import *

admin.site.register(Article)
admin.site.register(SousCategorie)
admin.site.register(Categorie)
admin.site.register(CentreInteret)
admin.site.register(Consulte)
admin.site.register(Abonnement)

@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display=('user', 'nom', 'prenom', 'age', 'adresse')


from rest_framework import serializers
from gestion_articles.models import *

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'user', 'nom', 'prenom', 'age', 'adresse']

class ArticleSerializer(serializers.ModelSerializer):
    auteur = UtilisateurSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('date_publication',)
    
    def get_likes_count(self, obj):
        return obj.like_set.count()
    
    def get_comments_count(self, obj):
        return obj.commentaire_set.count()

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'


class SousCategorieSerializer(serializers.ModelSerializer):
    categorie = CategorieSerializer(read_only=True)
    
    class Meta:
        model = SousCategorie
        fields = '__all__'



class CentreInteretSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentreInteret
        fields = '__all__'



class AbonnementSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer(read_only=True)
    centre_interet = CentreInteretSerializer(read_only=True)
    
    class Meta:
        model = Abonnement
        fields = '__all__'

class ConsulteSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)
    
    class Meta:
        model = Consulte
        fields = '__all__'
        read_only_fields = ('date_consultation',)



class LikeSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ('date_like',)
        extra_kwargs = {
            'utilisateur': {'required': False},
            'article': {'required': False}
        }



class CommentaireSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)
    
    class Meta:
        model = Commentaire
        fields = '__all__'
        read_only_fields = ('date_commentaire',)
        extra_kwargs = {
            'utilisateur': {'required': False},
            'article': {'required': False}
        }
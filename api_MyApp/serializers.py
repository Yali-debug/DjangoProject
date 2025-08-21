from rest_framework import serializers
from gestion_articles.models import *

class CentreInteretSerializer(serializers.ModelSerializer):
    """
    Serializer for the CentreInteret model.
    This serializer converts CentreInteret instances to JSON and vice versa.
    """
    
    class Meta:
        model = CentreInteret
        fields = '__all__'  # Serialize all fields of the CentreInteret model

class UtilisateurSerializer(serializers.ModelSerializer):
    """
    Serializer for the Utilisateur model.
    This serializer converts Utilisateur instances to JSON and vice versa.
    """
    centres_interet = CentreInteretSerializer(many=True, read_only=True)
    
    class Meta:
        model = Utilisateur
        fields = ['id','nom','prenom', 'adresse', 'age', 'user', 'centres_interet']# Serialize all fields of the Utilisateur model


class CategorieSerializer(serializers.ModelSerializer):
    """
    Serializer for the Categorie model.
    This serializer converts Categorie instances to JSON and vice versa.
    """
    
    class Meta:
        model = Categorie
        fields = '__all__'
          # Serialize all fields of the Categorie model

class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    This serializer converts Like instances to JSON and vice versa.
    """
    
    class Meta:
        model = Like
        fields = '__all__'  # Serialize all fields of the Like model

class ArticleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Article model.
    This serializer converts Article instances to JSON and vice versa.
    """
    class Meta:
        model = Article
        fields = '__all__'  # Serialize all fields of the Article model

class SousCategorieSerializer(serializers.ModelSerializer):
    """
    Serializer for the SousCategorie model.
    This serializer converts SousCategorie instances to JSON and vice versa.
    """
    
    class Meta:
        model = SousCategorie
        fields = '__all__'  # Serialize all fields of the SousCategorie model



class ConsulteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Consulte model.
    This serializer converts Consulte instances to JSON and vice versa.
    """
    
    class Meta:
        model = Consulte
        fields = '__all__'  # Serialize all fields of the Consulte model
        
class AbonnementSerializer(serializers.ModelSerializer):
    """
    Serializer for the Abonnement model.
    This serializer converts Abonnement instances to JSON and vice versa.
    """
    
    class Meta:
        model = Abonnement
        fields = '__all__'  # Serialize all fields of the Abonnement model

class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    This serializer converts Like instances to JSON and vice versa.
    """
    
    class Meta:
        model = Like
        fields = '__all__'  # Serialize all fields of the Like model
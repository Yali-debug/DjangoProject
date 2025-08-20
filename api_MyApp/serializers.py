from rest_framework.serializers import ModelSerializer
from gestion_articles.models import *

class CentreInteretSerializer(ModelSerializer):
    """
    Serializer for the CentreInteret model.
    This serializer converts CentreInteret instances to JSON and vice versa.
    """
    
    class Meta:
        model = CentreInteret
        fields = '__all__'  # Serialize all fields of the CentreInteret model
        read_only_fields = ['id']  # Make 'id' field read-only

class CategorieSerializer(ModelSerializer):
    """
    Serializer for the Categorie model.
    This serializer converts Categorie instances to JSON and vice versa.
    """
    
    class Meta:
        model = Categorie
        fields = '__all__'  # Serialize all fields of the Categorie model
        read_only_fields = ['id']  # Make 'id' field read-only

class SousCategorieSerializer(ModelSerializer):
    """
    Serializer for the SousCategorie model.
    This serializer converts SousCategorie instances to JSON and vice versa.
    """
    
    class Meta:
        model = SousCategorie
        fields = '__all__'  # Serialize all fields of the SousCategorie model
        read_only_fields = ['id']  # Make 'id' field read-only


class UtilisateurSerializer(ModelSerializer):
    """
    Serializer for the Utilisateur model.
    This serializer converts Utilisateur instances to JSON and vice versa.
    """
    
    class Meta:
        model = Utilisateur
        fields = '__all__'  # Serialize all fields of the Utilisateur model
        read_only_fields = ['id', 'user']  # Make 'id' and 'user' fields read-only

class ArticleSerializer(ModelSerializer):
    """
    Serializer for the Article model.
    This serializer converts Article instances to JSON and vice versa.
    """
    
    class Meta:
        model = Article
        fields = '__all__'  # Serialize all fields of the Article model
        read_only_fields = ['id', 'datePub', 'auteur']  # Make 'id', 'datePub', and 'auteur' fields read-only

class ConsulteSerializer(ModelSerializer):
    """
    Serializer for the Consulte model.
    This serializer converts Consulte instances to JSON and vice versa.
    """
    
    class Meta:
        model = Consulte
        fields = '__all__'  # Serialize all fields of the Consulte model
        read_only_fields = ['id', 'date_consultation', 'utilisateur', 'article']  # Make 'id', 'date_consultation', 'utilisateur', and 'article' fields read-only
        
class AbonnementSerializer(ModelSerializer):
    """
    Serializer for the Abonnement model.
    This serializer converts Abonnement instances to JSON and vice versa.
    """
    
    class Meta:
        model = Abonnement
        fields = '__all__'  # Serialize all fields of the Abonnement model
        read_only_fields = ['id', 'date_abonnement', 'utilisateur', 'centre_interet']  # Make 'id', 'date_abonnement', 'utilisateur', and 'centre_interet' fields read-only
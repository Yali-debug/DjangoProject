
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

    
class CentreInteretSerializer(serializers.ModelSerializer):
    """
    Serializer for the CentreInteret model.
    This serializer converts CentreInteret instances to JSON and vice versa.
    """
    
    class Meta:
        model = CentreInteret
        fields = '__all__'  # Serialize all fields of the CentreInteret model


class UtilisateurDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Utilisateur
        fields = ['id', 'nom', 'prenom', 'age', 'adresse', 'username', 'email']


class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    nom = serializers.CharField()
    prenom = serializers.CharField()
    age = serializers.IntegerField(required=False)
    adresse = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        nom = validated_data.pop('nom')
        prenom = validated_data.pop('prenom')
        age = validated_data.pop('age', None)
        adresse = validated_data.pop('adresse', '')

        # Création du User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Création du profil Utilisateur
        utilisateur = Utilisateur.objects.create(
            user=user,
            nom=nom,
            prenom=prenom,
            age =age,
            adresse = adresse
        )

        return utilisateur  # On retourne le profil pour la réponse


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

class SousCategorieSerializer(serializers.ModelSerializer):
    """
    Serializer for the SousCategorie model.
    This serializer converts SousCategorie instances to JSON and vice versa.
    """
    
    class Meta:
        model = SousCategorie
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    auteur = UtilisateurDetailSerializer(read_only = True)
    illustration_url = serializers.SerializerMethodField()
    sous_categorie = SousCategorieSerializer(read_only= True)
    modele_3d_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'titre', 'contenu', 'illustration', 'illustration_url', 'date_pub', 'modele_3d_url','auteur', 'sous_categorie']
        
    def get_illustration_url(self, obj):
        request = self.context.get('request')
        if obj.illustration and request:
            return request.build_absolute_uri(obj.illustration.url)
        return obj.illustration.url if obj.illustration else None
    
    
    def get_modele_3d_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.modele_3d.url) if obj.modele_3d else None




class ConsulteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Consulte model.
    This serializer converts Consulte instances to JSON and vice versa.
    """
    
    class Meta:
        model = Consulte
        fields = '__all__'  # Serialize all fields of the Consulte model
        
class AbonnementSerializer(serializers.ModelSerializer):
    centre_interet = CentreInteretSerializer(read_only =True)
    """
    Serializer for the Abonnement model.
    This serializer converts Abonnement instances to JSON and vice versa.
    """
    
    class Meta:
        model = Abonnement
        fields = ['id', 'utilisateur', 'centre_interet']  # Serialize all fields of the Abonnement model

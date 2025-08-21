from django.db import models

# Create your models hefrom django.db import models
from django.contrib.auth.models import User as DjangoUser


class CentreInteret(models.Model):
    libelle = models.CharField(max_length=100)
    
    def __str__(self):
        return self.libelle

class Utilisateur(models.Model):
    user = models.OneToOneField(DjangoUser, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    age = models.PositiveBigIntegerField()
    adresse = models.CharField(max_length=255)
    centres_interet = models.ManyToManyField(CentreInteret, through ="Abonnement")
    
    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Abonnement(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    centre_interet = models.ForeignKey(CentreInteret, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.utilisateur} - {self.centre_interet}"


class Categorie(models.Model):
    libelle = models.CharField(max_length=100)
    est_public = models.BooleanField(default=True)
    centre_interet = models.ForeignKey(CentreInteret, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.libelle

class SousCategorie(models.Model):
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    libelle = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.categorie.libelle} - {self.libelle}"

class Article(models.Model):
    titre = models.CharField(max_length=200)
    content = models.TextField()
    illustration = models.ImageField(upload_to='articles/')
    date_pub = models.DateTimeField(auto_now_add=True)

    #l'auteur est supprimé, l'article est conservé avec auteur=null
    auteur = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True, blank=True)
    sous_categorie = models.ForeignKey(SousCategorie, on_delete=models.PROTECT, related_name="articles")

    
    def __str__(self):
        return f"{self.titre} ({self.sous_categorie})"
    
    @property
    def like_count(self):
        return self.likes.count()

class Consulte(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    date_consultation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('utilisateur', 'article')
        ordering = ['-date_consultation']
        verbose_name = "Consultation"
        verbose_name_plural = "Consultations"

class Like(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='likes')
    date_like = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('utilisateur', 'article')
        ordering = ['-date_like']
    
    def __str__(self):
        return f"{self.utilisateur} liked {self.article}"
    
class Commentaire(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='commentaires')
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    contenu = models.TextField()
    date_commentaire = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_commentaire']
    
    def __str__(self):
        return f"{self.utilisateur} commented on {self.article}: {self.contenu[:20]}"
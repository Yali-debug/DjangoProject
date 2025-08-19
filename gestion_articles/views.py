""""
# Create your views here.
from django.shortcuts import render, get_object_or_404
from .models import Article, Categorie

def liste_articles(request):
    articles = Article.objects.all().order_by('-date_pub')
    print("Liste des articles:", articles)


def detail_article(request, article_id):
    article = get_object_or_404(Article, pk=article_id)

def articles_par_categorie(request, categorie_id):
    categorie = get_object_or_404(Categorie, pk=categorie_id)
    articles = Article.objects.filter(sous_categorie__categorie=categorie)

"""
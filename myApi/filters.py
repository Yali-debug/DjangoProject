import django_filters
from . import models
from .models import Article

class ArticleFilter(django_filters.FilterSet):
    sous_categorie = django_filters.NumberFilter(field_name='sous_categorie__id')
    categorie = django_filters.NumberFilter(field_name='sous_categorie__categorie__id')
    centre_interet = django_filters.NumberFilter(field_name='sous_categorie__categorie__centre_interet__id')
    search = django_filters.CharFilter(method='filter_search')

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(titre__icontains=value) | models.Q(contenu__icontains=value)
        )

    class Meta:
        model = Article
        fields = ['sous_categorie', 'categorie', 'centre_interet', 'search']
from rest_framework import permissions

class IsAuteurOrAdmin(permissions.BasePermission):
    """
    Permission personnalisée : seul l'auteur ou un admin peut modifier/supprimer
    """
    
    def has_object_permission(self, request, view, obj):
        # Lecture autorisée à tous (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Écriture : seulement auteur ou admin
        return obj.auteur == request.user or request.user.is_staff
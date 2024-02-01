from rest_framework import permissions
from emove.app.users.models import Users

class IsAdmin(permissions.BasePermission):
    message = "You aren't an admin"
    def has_permission(self, request, view):
        try:
            print(request.user)
            user = Users.objects.get(username=request.user)
            print(user.type)
            return user.type == 'admin'
        except:
            return False
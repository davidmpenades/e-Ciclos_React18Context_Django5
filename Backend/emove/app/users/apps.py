from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'emove.app.users'
    
    def ready(self):
                import emove.app.users.signals
from django.apps import AppConfig

class BikesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'emove.app.bikes'
    
    def ready(self):
        import emove.app.bikes.signals

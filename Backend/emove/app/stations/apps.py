from django.apps import AppConfig

class StationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'emove.app.stations'
    
    def ready(self):
        import emove.app.stations.signals

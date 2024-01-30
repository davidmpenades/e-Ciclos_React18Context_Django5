from django.db import models
from emove.app.stations.models import Stations
from emove.app.bikes.models import Bikes

class Slots(models.Model):
    station = models.ForeignKey(Stations, on_delete=models.CASCADE, null=False, related_name="slots")
    bike = models.OneToOneField(Bikes, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=100)
    slot_num = models.IntegerField()

    # Asegurarse de que el campo 'id' sea autogenerado
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return str(self.id)

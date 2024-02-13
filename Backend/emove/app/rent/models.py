from django.db import models
from emove.app.users.models import Users
from emove.app.bikes.models import Bikes
from emove.app.slots.models import Slots


class Rent(models.Model):
    
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user")
    bike = models.ForeignKey(Bikes, on_delete=models.CASCADE, related_name="scooter")
    initial_slot = models.ForeignKey(Slots, on_delete=models.CASCADE, related_name="start_slot")
    end_slot = models.ForeignKey(Slots, on_delete=models.CASCADE, null=True, related_name="end_slot")
    initial_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.id)
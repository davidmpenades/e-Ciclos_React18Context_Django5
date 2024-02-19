from django.db import models
from emove.app.users.models import Users
from emove.app.slots.models import Slots

class IncidenceSlot(models.Model):

    title = models.CharField(max_length=25)
    status = models.CharField(max_length=100, default='pending')
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_incident")
    slot = models.ForeignKey(Slots, on_delete=models.CASCADE, related_name="slot_affected")

    def __str__(self):
        return str(self.id)
    
class Notification(models.Model):

    seen = models.BooleanField(default=False)
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_notification")

    def __str__(self):
        return str(self.id)
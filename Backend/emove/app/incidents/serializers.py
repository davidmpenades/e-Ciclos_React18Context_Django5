from rest_framework import serializers
from .models import IncidenceSlot, Notification
from emove.app.users.models import Users
from emove.app.bikes.models import Bikes
from emove.app.slots.models import Slots

class IncidenceSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidenceSlot
        fields = [ 'id', 'title', 'status', 'desc', 'user_id', 'slot_id']

    def to_incidence_slot(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "slot_id": instance.slot_id
        })

    def create(context):
        username = context['username']
        slot_id = context['slot_id']
        title = context['title']
        desc = context['desc']

        user = Users.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        slot = Slots.objects.get(pk=slot_id)
        if slot is None:
            raise serializers.ValidationError('Slot not found')

        if title is None:
            raise serializers.ValidationError('Title is required')

        if desc is None:
            raise serializers.ValidationError('Description is required')

        incidence = IncidenceSlot.objects.create(title=title, desc=desc, user_id=user.id, slot_id=slot.id)

        incidence.save()
        return incidence
    
    def updateStatus(id, context):
        new_status = context['status']
        
        incidence = IncidenceSlot.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('Slot not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is in progress.", user_id=incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="Your slot incidence: " + str(incidence.title) + ", is resolved. Thank you!", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'desc', 'seen']

    def to_notification(instance):
        return ({
            "id": instance.id,
            "desc": instance.desc,
            "seen": instance.seen
        })
    
    def getUserNotification(username):
        user = Users.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        notification = Notification.objects.filter(user_id=user.id, seen=False)
        return notification

    def seeNotification(context):
        notification_id = context['id']
        username = context['username']

        user = Users.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User is not found')

        notification = Notification.objects.get(pk=notification_id, user_id=user.id, seen=False)
        if notification is None:
            raise serializers.ValidationError('Notification not found')

        notification.seen = True
        notification.save()

        return notification
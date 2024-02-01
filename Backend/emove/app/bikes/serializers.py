from rest_framework import serializers
from .models import Bikes
from emove.app.users.models import Users

from random import randint

class BikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bikes
        fields = ('id','slug','name_bike','status','img_bike')
        
    def create(self, instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'name_bike': instance.name_bike,
            'status': instance.status,
            'img_bike': instance.img_bike,
        }
    
    def getUserBike(context):
        username = context['username']
        user = Users.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')
        return user
        # rent = Rent.objects.get(user_id=user.id, end_slot_id=None)
        # if rent is None:
        #     raise serializers.ValidationError('You have not rented any scooter')

        # bike = Bikes.objects.get(pk=rent.bike_id)
        # if bike is None:
        #     raise serializers.ValidationError('Error retreiving the scooter')

        # return bike
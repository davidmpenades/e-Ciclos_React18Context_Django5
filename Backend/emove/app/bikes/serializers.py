from rest_framework import serializers
from .models import Bikes

from random import randint

class BikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bikes
        fields = ('id','slug','name_bike','status')
        
        def create(self, instance):
            return {
                'id': instance.id,
                'slug': instance.slug,
                'name_bike': instance.name_bike,
                'status': instance.status,
                'img_bike': instance.img_bike,
            }
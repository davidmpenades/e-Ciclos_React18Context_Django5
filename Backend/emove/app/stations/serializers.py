from rest_framework import serializers
from .models import Stations
from ..slots.models import Slots

from random import randint

class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stations
        fields = ['id', 'slug', 'name','num_bikes', 'latitude', 'longitude','status', 'img_st']
        
    def to_representation(self, instance):
        total_slots = len(Slots.objects.filter(station_id=instance.id).exclude(status='in_use')) 
        total_bikes = len(Slots.objects.filter(station_id=instance.id, status='in_use'))      
        return {
            'id': instance.id,
            'slug': instance.slug,
            'name': instance.name,
            'num_bikes': total_bikes,
            'latitude': instance.latitude,
            'longitude': instance.longitude,
            'status': instance.status,
            'img_st': instance.img_st,
            'total_slots': total_slots
        }
            

    
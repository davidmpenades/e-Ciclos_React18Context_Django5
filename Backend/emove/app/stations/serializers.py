from rest_framework import serializers
from .models import Stations

from random import randint

class StationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stations
        fields = ['id', 'slug', 'name','num_bikes', 'latitude', 'longitude','status', 'img_st']
        
        def create(self, instance):
            return {
                'id': instance.id,
                'slug': instance.slug,
                'name': instance.name,
                'num_bikes': instance.num_bikes,
                'latitude': instance.latitude,
                'longitude': instance.longitude,
                'status': instance.status,
                'img_st': instance.img_st,
        }
            

    
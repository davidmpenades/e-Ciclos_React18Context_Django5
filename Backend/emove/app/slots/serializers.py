from rest_framework import serializers
from ..stations.models import Stations
from ..bikes.models import Bikes
from .models import Slots

class SlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slots
        fields = ['id', 'station_id', 'bike_id', 'status', 'slot_num']

    def create(self, validated_data):
        station_id = validated_data['station_id']
        station = Stations.objects.get(pk=station_id)

        if station is None:
            raise serializers.ValidationError('Station not found')

        slot = Slots.objects.create(station_id=station_id, bike_id=None, status="vacant", slot_num=validated_data.get('slot_num', 0) + 1)
        slot.save()
        return slot

    def update(self, instance, validated_data):
        bike_id = validated_data.get('bike_id', 0)
        context_status = validated_data.get('status', '')

        if context_status == 'maintenance':
            instance.status = 'maintenance'
            instance.save()
            return instance

        if bike_id != 0 and instance.bike_id is not None:
            raise serializers.ValidationError('Slot is already in use')

        if bike_id != 0:
            bike = Bikes.objects.get(pk=bike_id)
            if bike is None:
                raise serializers.ValidationError('Bike not found')

            instance.bike_id = bike_id
            instance.status = "in_use"

        if bike_id == 0:
            instance.bike_id = None
            instance.status = "vacant"

        instance.save()
        return instance

from datetime import datetime
from rest_framework import serializers
from .models import Rent
from emove.app.users.models import Users
from emove.app.bikes.models import Bikes
from emove.app.slots.models import Slots

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Rent
        fields = ['id', 'user_id', 'bike_id', 'initial_slot_id','end_slot_id', 'initial_date', 'end_date']
        
    def to_rent(instance):
        return ({
            "id": instance.id,
            "user": instance.user_id,
            "bike": instance.bike_id,
            "initial_slot": instance.initial_slot_id,
            "end_slot": instance.end_slot_id,
            "initial_date": instance.initial_date,
            "end_date": instance.end_date,
        })
    
    def rent(context):
        username = context['username']
        slot_id = context['slot_id']

        user = Users.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        slot = Slots.objects.get(pk=slot_id)

        if slot is None or slot.bike_id is None:
            raise serializers.ValidationError('Slot not found')
        
        bike = Bikes.objects.get(pk=slot.bike_id)
        if bike is None:
            raise serializers.ValidationError('Bike not found')

        user_rent = Rent.objects.filter(user_id=user.id, end_slot_id=None)
        if len(user_rent) > 0:
            raise serializers.ValidationError('You only can rent one bike')

        rent = Rent.objects.create(user_id=user.id, bike_id=slot.bike_id, initial_slot_id=slot_id)
        rent.save()

        slot.bike_id = None
        slot.status = 'vacant'
        slot.save()

        bike.status = 'in_use'
        bike.save()
        return rent
    
    def getOneRent(context):
        username = context['username']

        user = Users.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        rent = Rent.objects.get(user_id=user.id, end_slot_id=None)
        return rent
    
    # def backBike(context):
    #     username = context['username']
    #     bike_id = context['bike_id']
    #     slot_id = context['slot_id']

    #     user = Users.objects.get(username=username)

    #     if user is None:
    #         raise serializers.ValidationError('User not found')

    #     bike = Bikes.objects.get(pk=bike_id)

    #     if bike is None:
    #         raise serializers.ValidationError('Bike not found')

    #     rent = Rent.objects.get(user_id=user.id,bike_id=bike_id, end_slot_id=None)

    #     if rent is None:
    #         raise serializers.ValidationError('Rent not found')

    #     new_slot = Slots.objects.get(pk=slot_id)
    #     id_bike = rent.bike_id
    #     bike = Bikes.objects.get(pk=id_bike)
        
    #     if new_slot is None or new_slot.bike_id is not None:
    #         raise serializers.ValidationError('Slot not found or in use')

    #     # if new_slot.status == "manteinance":
    #     #     raise serializers.ValidationError('Slot in manteinance')

    #     rent.end_slot_id = new_slot.id
    #     rent.end_date = datetime.now()
    #     rent.save()

    #     new_slot.bike_id = bike.id
    #     new_slot.status = 'in_use'
    #     new_slot.save()

    #     bike.status = 'vacant'
    #     bike.save()
    def backBike(self,instance, validated_data):
        end_slot_id = validated_data.get('end_slot_id')
        bike_id = validated_data.get('bike_id')

        if not end_slot_id:
            raise serializers.ValidationError('End slot ID is required')

        if not bike_id:
            raise serializers.ValidationError('Bike ID is required')

        new_slot = Slots.objects.filter(pk=end_slot_id, bike_id=None).first()
        if not new_slot:
            raise serializers.ValidationError('Slot not found or in use')

        if new_slot.status == "maintenance":
            raise serializers.ValidationError('Slot in maintenance')

        instance.end_slot = new_slot
        instance.end_date = datetime.now()
        instance.save()

        new_slot.bike_id = bike_id
        new_slot.status = 'in_use'
        new_slot.save()

        instance.bike.status = 'vacant'
        instance.bike.save()

        return instance

       
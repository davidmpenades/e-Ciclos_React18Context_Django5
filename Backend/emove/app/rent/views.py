from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from .serializers import RentSerializer
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from emove.app.core.permissions import IsAdmin
from .models import Rent
from .models import Users
from .models import Bikes
from .models import Slots
from emove.app.users.serializers import userSerializer

class RentView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def rent(self, request, slot_id):
        username = request.user
        serializer_context = { 'username': username, 'slot_id': slot_id }
        serializer = RentSerializer.rent(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))
    
    # def getOneRent(self, request):
    #     username = request.user
    #     serializer_context = { 'username': username }
    #     serializer = RentSerializer.getOneRent(context=serializer_context)
    #     return Response(RentSerializer.to_rent(serializer))
    def getOneRent(self, request):
        username = request.user
        serializer_context = {'username': username}
        rent = Rent.objects.filter(user=username).first()
        serializer = RentSerializer(rent)
        return Response(serializer.data)
    
    # def backBike(self, request):
    #     data = request.data['bike']
    #     username = request.user
    #     serializer_context = {'username': username, 'slot_id': data['end_slot_id'], 'bike_id': data['bike_id']}
    #     serializer = RentSerializer.backBike(context=serializer_context)
    #     return Response(RentSerializer.to_rent(serializer))
    def backBike(self, request):
        username1 = request.user.username       
        user = Users.objects.filter(username=username1).first()       
        if not user:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        rent = Rent.objects.filter(user=user.id, end_slot_id=None).first()         
        if not rent:
            return Response({'message': 'No active rental found for this user.'}, status=status.HTTP_404_NOT_FOUND)
    
        bike = Bikes.objects.filter(id=rent.bike_id).first()   
        if not bike:
            return Response({'message': 'Bike not found.'}, status=status.HTTP_404_NOT_FOUND)             
        
        end_slot_id = request.data['end_slot_id'] 
        bike_id = bike.id        
        
        new_slot = Slots.objects.filter(pk=end_slot_id, bike_id=None).first()
        
        if not new_slot:
            return Response({'message': 'Slot not found or in use'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_slot.status == "maintenance":
            return Response({'message': 'Slot in maintenance'}, status=status.HTTP_400_BAD_REQUEST)

        rent.end_slot = new_slot
        rent.end_date = request.data['end_date']
        rent.save()
        
        new_slot.bike_id = bike_id
        new_slot.status = 'in_use'
        new_slot.save()

        bike.status = 'vacant'
        bike.save()

        serializer = RentSerializer(rent)  # Serialize the updated rent object
        return Response(serializer.data)
    
    def allRents(self, request):
        data = Rent.objects.all()
        print(data)
        serializer = RentSerializer(data, many=True)
        return Response(serializer.data)

    
class RentAdminView(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    def getAllRents(self, request):
        data = Rent.objects.all()
        serializer = RentSerializer(data, many=True)
        return Response(serializer.data)

    def deleteRent(self, request, id):
        rent = Rent.objects.get(id=id)
        rent.delete()
        return Response({'data': 'Rent deleted successfully'})
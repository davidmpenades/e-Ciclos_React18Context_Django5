from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from .serializers import RentSerializer
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from emove.app.core.permissions import IsAdmin
from .models import Rent

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
        
        username ={'username': request.user.username}        
        return JsonResponse(username)
        rent = Rent.objects.filter(user=request.user, end_slot_id=None).first()        
        
        if not rent:
            return Response({'message': 'No active rental found for this user.'}, status=status.HTTP_404_NOT_FOUND)
       
        data = request.data(RentSerializer(rent).data)
        return Response(request.data)
        # print(data)
        serializer_context = {'end_slot_id': data.get('end_slot_id'), 'bike_id': data.get('bike_id')}
        serializer = RentSerializer()
        updated_rent = serializer.backBike(rent, serializer_context)
        return Response(RentSerializer(updated_rent).data)
    
        data = request.data['scooter']
        username = request.user
        serializer_context = {'username': username, 'slot_id': data['end_slot'], 'scooter_id': data['scooter_id']}
        serializer = RentSerializer.bringbackScooter(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

    
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
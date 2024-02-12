from rest_framework.response import Response
from rest_framework import viewsets, status
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
    
    def getOneRent(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = RentSerializer.getOneRent(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))
    
    def backBike(self, request):
        data = request.data['bike']
        username = request.user
        serializer_context = {'username': username, 'slot_id': data['end_slot'], 'bike_id': data['bike_id']}
        serializer = RentSerializer.backBike(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))
from django.shortcuts import render
from rest_framework.response import Response
from django.db import models
from .serializers import IncidenceSlotSerializer, NotificationSerializer
from .models import IncidenceSlot
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated)
from emove.app.core.permissions import IsAdmin


class IncidenceSlotView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]    

    def getSlotMyIncidents(self, request):
        data = request.user
        incidents = IncidenceSlot.objects.filter(user=data)
        incidents_serializer = IncidenceSlotSerializer(incidents, many=True)
        return Response(incidents_serializer.data)
    
    def deleteAllMyIncidents(self, request):
        data = request.user
        incidents = IncidenceSlot.objects.filter(user=data)
        incidents.delete()
        return Response({'data': 'All Incidences deleted successfully'})
    
    def create(self, request):
        data = request.data
        serializer_context = {
            'username': request.user,
            'slot_id': data['slot_id'],
            'title': data['title'],
            'desc': data['desc'],
        }

        incidence = IncidenceSlotSerializer.create(serializer_context)
   
        return Response(IncidenceSlotSerializer.to_incidence_slot(incidence))
    
class IncidentsViews(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]
    
    def getAllIncidentsSlots(self, request):
        incidents_slots = IncidenceSlot.objects.all()
        incidents_slots_serializer = IncidenceSlotSerializer(incidents_slots, many=True)
        return Response(incidents_slots_serializer.data)
        
    def deleteIncidenceSlot(self, request, id):
        incidence_slot = IncidenceSlot.objects.get(id=id)
        incidence_slot.delete()
        return Response({'data': 'Incidence deleted successfully'})
    
    def updateIncidenceSlot(self, request, id):
        context = request.data
        incidence = IncidenceSlotSerializer.updateStatus(id, context)
        return Response(IncidenceSlotSerializer.to_incidence_slot(incidence))

class NotificationsView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def getSlotNotifications(self, request):
        notifications_serializer = NotificationSerializer.getUserNotification(request.user)
        notifications = NotificationSerializer(notifications_serializer, many=True)
        return Response(notifications.data)

    def seenNotification(self, request, id):
        serializer_context = { 'username': request.user, 'id': id }
        serializer = NotificationSerializer.seeNotification(context=serializer_context)
        return Response(NotificationSerializer.to_notification(serializer))
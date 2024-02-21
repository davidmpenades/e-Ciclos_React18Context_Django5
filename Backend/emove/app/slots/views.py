from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import Slots
from .serializers import SlotsSerializer
from rest_framework.permissions import (AllowAny)
from emove.app.core.permissions import IsAdmin

@api_view(['GET', 'POST', 'DELETE'])
def get_permissions(self):
    if self.request.method == 'GET':
        self.permission_classes = [AllowAny]
    else:
        self.permission_classes = [IsAdmin]
    return super(slots_list, self).get_permissions()
def slots_list(request):
    try:
        if request.method == 'GET':
            slots = Slots.objects.all()
            slots_serializer = SlotsSerializer(slots, many=True)
            return JsonResponse(slots_serializer.data, safe=False)

        elif request.method == 'POST':
            slots_data = request.data.copy()
            # Asegurémonos de que 'id' no se incluya en el diccionario
            slots_data.pop('id', None)

            # Crear una nueva instancia de Slots sin el 'id'
            new_slot = Slots.objects.create(
                station_id=slots_data['station_id'],
                bike_id=slots_data['bike_id'],
                status=slots_data['status'],
                slot_num=slots_data['slot_num']
            )

            response_data = SlotsSerializer(new_slot).data
            return Response(response_data, status=status.HTTP_201_CREATED)

        elif request.method == 'DELETE':
            count = Slots.objects.all().delete()
            return JsonResponse({'message': '{} Slots were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return JsonResponse({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'PUT', 'DELETE'])

def get_permissions(self):
    if self.request.method == 'GET':
        self.permission_classes = [AllowAny]
    else:
        self.permission_classes = [IsAdmin]
    return super(slots_detail, self).get_permissions()
def slots_detail(request, pk):
    
    try: 
        slot = Slots.objects.get(id=pk) 
    except Slots.DoesNotExist: 
        return JsonResponse({'message': 'The slot does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        slots_serializer = SlotsSerializer(slot) 
        return JsonResponse(slots_serializer.data) 
 
    elif request.method == 'PUT': 
        slots_data = JSONParser().parse(request) 
        slots_serializer = SlotsSerializer(slot, data=slots_data) 
        if slots_serializer.is_valid(): 
            slots_serializer.save() 
            return JsonResponse(slots_serializer.data) 
        return JsonResponse(slots_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        slot.delete() 
        return JsonResponse({'message': 'Slot was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

    
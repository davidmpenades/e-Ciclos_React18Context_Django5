from django.shortcuts import render
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.urls import reverse
from rest_framework.response import Response


from .models import Stations
from .serializers import StationsSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def stations_list(request):  
    
    if request.method == 'GET':  
        stations = Stations.objects.all()
        stations_serializer = StationsSerializer(stations, many=True)
        return Response(stations_serializer.data, status=status.HTTP_200_OK) 
        name = request.GET.get('name', None)
        if name is not None:
            stations = stations.filter(name__icontains=name)
        
        stations_serializer = StationsSerializer(stations, many=True)
        return JsonResponse(stations_serializer.data, safe=False) 

    elif request.method == 'POST':
        
        stations_data = JSONParser().parse(request)
        
        stations_serializer = StationsSerializer(data=stations_data)
        
        if stations_serializer.is_valid():
            stations_serializer.save()
            return JsonResponse(stations_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Stations.objects.all().delete()
        return JsonResponse({'message': '{} Stations were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
    
 
@api_view(['GET', 'PUT', 'DELETE'])
def stations_detail(request, pk):
    try: 
        station = Stations.objects.get(id=pk) 
    except Stations.DoesNotExist: 
        return JsonResponse({'message': 'The station does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        # stations_serializer = StationsSerializer(station)
        stations_serializer = StationsSerializer.to_representation(station, instance=station)    
        # return JsonResponse({'message': stations_serializer}, status=status.HTTP_204_NO_CONTENT)
                   
        
        return JsonResponse(stations_serializer) 
 
    elif request.method == 'PUT': 
        stations_data = JSONParser().parse(request) 
        stations_serializer = StationsSerializer(station, data=stations_data) 
        if stations_serializer.is_valid(): 
            stations_serializer.save() 
            return JsonResponse(stations_serializer.data) 
        return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        station.delete() 
        return JsonResponse({'message': 'station was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
   
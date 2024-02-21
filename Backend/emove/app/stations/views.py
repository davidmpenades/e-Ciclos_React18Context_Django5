from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from emove.app.core.permissions import IsAdmin
from .models import Stations
from .serializers import StationsSerializer
from django.http import JsonResponse

class StationsList(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        else:
            self.permission_classes = [IsAdmin]
        return super(StationsList, self).get_permissions()

    def get(self, request):
        stations = Stations.objects.all()
        stations_serializer = StationsSerializer(stations, many=True)
        return Response(stations_serializer.data, status=status.HTTP_200_OK) 
    
    def post(self, request):
        stations_data = request.data        
        stations_serializer = StationsSerializer(data=stations_data)
        
        if stations_serializer.is_valid():
            stations_serializer.save()
            return JsonResponse(stations_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        count = Stations.objects.all().delete()
        return JsonResponse({'message': '{} Stations were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

class StationsDetail(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        else:
            self.permission_classes = [IsAdmin]
        return super(StationsDetail, self).get_permissions()
    
    def get(self, request, pk):
        try: 
            station = Stations.objects.get(id=pk) 
        except Stations.DoesNotExist: 
            return JsonResponse({'message': 'La estación no existe'}, status=status.HTTP_404_NOT_FOUND) 

        stations_serializer = StationsSerializer(station)
        return JsonResponse(stations_serializer.data) 

    def put(self, request, pk):
        try: 
            station = Stations.objects.get(id=pk) 
        except Stations.DoesNotExist: 
            return JsonResponse({'message': 'La estación no existe'}, status=status.HTTP_404_NOT_FOUND) 

        stations_data = request.data
        stations_serializer = StationsSerializer(station, data=stations_data) 

        if stations_serializer.is_valid(): 
            stations_serializer.save() 
            return JsonResponse(stations_serializer.data) 
        return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    def delete(self, request, pk):
        try: 
            station = Stations.objects.get(id=pk) 
        except Stations.DoesNotExist: 
            return JsonResponse({'message': 'La estación no existe'}, status=status.HTTP_404_NOT_FOUND) 

        station.delete() 
        return JsonResponse({'message': '¡La estación se eliminó correctamente!'}, status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST', 'DELETE'])
# @permission_classes([IsAuthenticatedOrReadOnly])

# def stations_list(request):  
#     if request.method == 'GET':  
#         stations = Stations.objects.all()
#         stations_serializer = StationsSerializer(stations, many=True)
#         return Response(stations_serializer.data, status=status.HTTP_200_OK) 
    
#     elif request.method == 'POST':        
#         stations_data = JSONParser().parse(request)        
#         stations_serializer = StationsSerializer(data=stations_data)
        
#         if stations_serializer.is_valid():
#             stations_serializer.save()
#             return JsonResponse(stations_serializer.data, status=status.HTTP_201_CREATED) 
#         return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         count = Stations.objects.all().delete()
#         return JsonResponse({'message': '{} Stations were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
    
 
# @api_view(['GET', 'PUT', 'DELETE'])

# # def get_permissions(self):
# #         if self.request.method == 'GET':
# #             self.permission_classes = [AllowAny]
# #         else:
# #             self.permission_classes = [IsAuthenticatedOrReadOnly, IsAdmin]
# #         return super(stations_detail, self).get_permissions()
# def stations_detail(request, pk):
#     try: 
#         station = Stations.objects.get(id=pk) 
#     except Stations.DoesNotExist: 
#         return JsonResponse({'message': 'The station does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
#     if request.method == 'GET':
#         # stations_serializer = StationsSerializer(station)
#         stations_serializer = StationsSerializer.to_representation(station, instance=station)    
#         # return JsonResponse({'message': stations_serializer}, status=status.HTTP_204_NO_CONTENT)                 
        
#         return JsonResponse(stations_serializer) 
 
#     elif request.method == 'PUT': 
        
#         stations_data = JSONParser().parse(request) 
#         stations_serializer = StationsSerializer(station, data=stations_data) 
#         if stations_serializer.is_valid(): 
#             stations_serializer.save() 
#             return JsonResponse(stations_serializer.data) 
#         return JsonResponse(stations_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
#     elif request.method == 'DELETE': 
#         station.delete() 
#         return JsonResponse({'message': 'station was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
   
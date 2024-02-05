from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import userSerializer
from .models import Users, Profile
from .serializers import ProfileSerializer
from emove.app.bikes.serializers import BikesSerializer
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser)
from emove.app.core.permissions import IsAdmin

class UserView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    def register(self, request):
        data = request.data

        serializer_context = {
            'username': data['username'],
            'email': data['email'],
            'password': data['password']
        }

        serializer = userSerializer.register(serializer_context)
        ProfileSerializer.create(context=serializer['user'])
        return Response(serializer)

    def login(self, request):
        data = request.data

        serializer_context = {
            'username': data['username'],
            'password': data['password']
        }
        
        serializer = userSerializer.login(serializer_context)
        return Response(serializer)

class UserInfoView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def getUser(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = userSerializer.getUser(context=serializer_context)
        return Response(serializer)

    def refreshToken(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = userSerializer.refreshToken(serializer_context)
        return Response(serializer)

    def getUserbike(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = BikesSerializer.getUserBike(context=serializer_context)
        return Response(BikesSerializer.to_Bike(serializer))

    def logout(self, request):
        return Response()

class UserAdminView(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]
    # print(permission_classes)

    def getAllUsers(self, request):
        users = Users.objects.all()
        users_serializer = userSerializer(users, many=True)
        return Response(users_serializer.data)
    
    def getUser(self, request, uuid):
        user = Users.objects.get(uuid=uuid)
        user_serializer = userSerializer(user, many=False)
        return Response(user_serializer.data)

    def delete(self, request, uuid):
        user = Users.objects.get(uuid=uuid)
        print(user)
        user.delete()
        return Response({'data': 'User deleted successfully'})

class ProfileView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    print(permission_classes)

    def getProfile(self, request, id):
        print(id)
        profile = Profile.objects.get(user_id=id)
        profile_serializer = ProfileSerializer(profile, many=False)
        return Response(profile_serializer.data)

    def updateProfile(self, request, id):
        print(request.data)
        print(id)
        current_user = request.user
        print(current_user)
        data_user = request.data.get('user')
        print(data_user)
        data_profile = request.data.get('profile')
        print(data_profile)
        serializer_profile = ProfileSerializer.update(current_user=current_user, user_context=data_user, profile_context=data_profile)
        return Response(serializer_profile)
  
    # def getStats(self, request, id):
    #     current_user = request.user
    #     serializer = ProfileSerializer.getStats(current_user=current_user, id=id)
    #     return Response(serializer)
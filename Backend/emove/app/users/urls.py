from django.urls import path
from .views import UserView, UserInfoView, UserAdminView, ProfileView

urlpatterns = [
    #users
    path('users/', UserAdminView.as_view({'get': 'getAllUsers'})),
    path('register/', UserView.as_view({'post': 'register'})),
    path('login/', UserView.as_view({'post': 'login'})),
    path('user/<str:uuid>', UserAdminView.as_view({'get': 'getUser'})),
    path('user', UserInfoView.as_view({'get': 'getUser'})),
    path('userBike', UserInfoView.as_view({'get': 'getUserbike'})),
    path('refresh_token', UserInfoView.as_view({'get': 'refreshToken'})),
    path('user/<str:uuid>', UserAdminView.as_view({'delete': 'delete'})),
    
    #Profile
    path('profile/<str:id>', ProfileView.as_view({'get': 'getProfile'})),
    path('profile/update/<str:id>', ProfileView.as_view({'put': 'updateProfile'})),
]
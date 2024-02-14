from django.urls import path
from .views import StationsList, StationsDetail

urlpatterns = [
    path('stations/', StationsList.as_view({'get': 'get'})),
    path('stations/', StationsList.as_view({'post': 'post'})),
    path('stations/', StationsList.as_view({'delete': 'delete'})),
    path('stations/<int:pk>', StationsDetail.as_view({'get': 'get'})),
    path('stations/<int:pk>', StationsDetail.as_view({'put': 'put'})),
    path('stations/<int:pk>', StationsDetail.as_view({'delete': 'delete'})),
]

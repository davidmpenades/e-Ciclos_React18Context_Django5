from django.urls import path
from . import views

urlpatterns = [
    path('bikes/', views.bikes_list, name='bikes-list'),
    path('bikes/<int:pk>', views.bikes_detail, name='bikes-detail')
]

from django.urls import path
from . import views

urlpatterns = [
    
    path('slots/', views.slots_list, name='slots-list'),

    path('slots/<int:pk>', views.slots_detail, name='slots-detail'),

]
from django.urls import path
from .views import IncidenceSlotView, IncidentsViews, NotificationsView

urlpatterns = [
    #Incidents Admin
    path('slots_incidents', IncidentsViews.as_view({"get": "getAllIncidentsSlots"})),
    path('slot_incidence_del/<str:id>', IncidentsViews.as_view({"delete": "deleteIncidenceSlot"})),
    path('slot_incidence/<str:id>', IncidentsViews.as_view({"patch": "updateIncidenceSlot"})),
    
    #Slot Incidents Client
    path('slot_my_incidents', IncidenceSlotView.as_view({"get": "getSlotMyIncidents"})),
    path('slot_incidence', IncidenceSlotView.as_view({"post": "create"})),
    path('delete_slot_incidence', IncidenceSlotView.as_view({"delete": "deleteAllMyIncidents"})),
    
    #Notifications
    path('slot_notifications', NotificationsView.as_view({"get": "getSlotNotifications"})),
    path('notifications/<int:id>', NotificationsView.as_view({"put": "seenNotification"})),
]

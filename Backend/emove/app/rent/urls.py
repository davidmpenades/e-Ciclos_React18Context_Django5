from django.urls import path
from .views import RentView, RentAdminView

urlpatterns = [
    path('rent/', RentView.as_view({'get':'getOneRent'})),
    path('rent/<int:slot_id>', RentView.as_view({'post':'rent'})),
    path('backBike/', RentView.as_view({'put':'backBike'})),
    path('rents/', RentAdminView.as_view({"get": "getAllRents"}))
]

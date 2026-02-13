from django.urls import path

from . import views

urlpatterns = [
    path("searchfood/", views.SearchFood, name="searchfood"),

]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('visual/', views.visual, name='visual'),
    path('about/', views.about, name='about'),
]

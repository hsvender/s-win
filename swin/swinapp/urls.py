from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('visual/', views.visual, name='visual'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('api/', views.all_competencies, name='api'),
]

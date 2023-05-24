from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('visual/', views.visual, name='visual'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('prog_competencies', views.prog_competencies, name='prog_competencies'),
    path('soft_competencies', views.soft_competencies, name='soft_competencies'),
]

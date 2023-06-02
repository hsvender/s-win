from django.shortcuts import render
import json
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.cache import never_cache
import os

def home(request):
    return render(request, 'index.html')

def visual(request):
    return render(request, 'visual.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

@never_cache
def prog_competencies(request):
    json_path = os.path.join(settings.STATIC_ROOT, 'swinapp/data/comp_prog_count.json')
    with open(json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return JsonResponse(data)

def soft_competencies(request):
    json_path = os.path.join(settings.STATIC_ROOT, 'swinapp/data/comp_soft_count.json')
    with open(json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return JsonResponse(data)

def all_competencies(request):
    json_path = os.path.join(settings.STATIC_ROOT, 'swinapp/data/year_skill_counts_1.json')
    with open(json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return JsonResponse(data, safe=False)


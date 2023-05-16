from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def visual(request):
    return render(request, 'visual.html')

def about(request):
    return render(request, 'about.html')
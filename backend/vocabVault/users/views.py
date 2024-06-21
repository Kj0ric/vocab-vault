from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.template import loader 
# Create your views here.

def user_register(request):
    # Create new user and save it to the database
    if request.method == 'POST': 
        username = request.POST['username']
        password = request.POST['password']
        
        user = User.objects.create=user(username=username, password=password)
        user.save()
    
    # If the request.method == 'GET', render the page
    else: 
        template = loader.get_template('register.html')
        return HttpResponse(template.render({}, request))
        
# def user_login(request):
    
# def user_logout(request):
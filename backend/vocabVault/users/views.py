from django.shortcuts import render
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile


# Create your views here.

def user_register(request):
    # 'request' contains username and password data
    if request.method == 'POST': 
        # Django's built-in UserCreationForm handles the validation of the input data.
        form = UserCreationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            try:
                # Create a new user instance and save it to the database
                new_user = User.objects.create_user(username=username, password=password)
                new_user.save() # Save it to the database
                
                # Create a UserProfile instance for the new user
                new_profile = UserProfile(user=new_user)
                new_profile.save()
                
                # Return a 201 Created status code and a JSON object representing the user
                return JsonResponse({'username': new_user.username, 'id': new_user.id},  status=201)
            
            except ValidationError as e:
                # create_user performs validation (taken usernamce etc.)
                # Return a 400 Bad Request status code and a message explaining the error
                return JsonResponse({'error': e.messages[0]}, status=400)
        else:
            # Instead of rendering the form with errors, send back the errors as JSON
            errors = form.errors.as_json()
            return JsonResponse({'errors': errors}, status=400)
    else: # If the request.method == 'GET', render the page with empty form
        form = UserCreationForm() 
        return render(request, 'userregisterpage.html', {'form': form})
        
def user_login(request):
    form = UserCreationForm()
    return render(request, 'userloginpage.html', {'form': form})
    
# def user_logout(request):
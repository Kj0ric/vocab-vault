from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


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
                # new_profile = UserProfile(user=new_user)
                # new_profile.save()
                
                # Return a 201 Created status code and a JSON object representing the user
                return JsonResponse({'username': new_user.username, 'id': new_user.id},  status=201)
            
            except ValidationError as e:
                # Return a 400 Bad Request status code and a message explaining the error
                return JsonResponse({'error': e.messages[0]}, status=400)
        else:
            # Instead of rendering the form with errors, send back the errors as JSON
            errors = {field: error.get_json_data() for field, error in form.errors.items()}
            return JsonResponse({'errors': errors}, status=400)
    else: # If the request.method == 'GET', render the page with empty form
        form = UserCreationForm() 
        return render(request, 'userregisterpage.html', {'form': form})
        
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('uname')
        password = request.POST.get('psw')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'You have successfully logged in.', 'username': username}, status=200) 
        else:
            # Return an 'invalid login' error message.
            messages.error(request, 'Invalid username or password.')
            
    # If the request is not POST, inform the client that the method is not allowed
    return render(request, 'userloginpage.html')  

def user_logout(request):
    logout(request)
    return redirect('homepage.html')
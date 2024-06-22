from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
import logging
from django.utils import timezone

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
            errors = form.errors.as_json()
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
            messages.success(request, 'You have successfully logged in.')
            return redirect('favorites')  # Replace 'favorites' with the name of your favorites page URL

        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'userloginpage.html')
    
# def user_logout(request):
from django.contrib.auth.decorators import login_required
from .models import FavoriteWord

@login_required
def favorite_words(request):
    favorites = FavoriteWord.objects.filter(user=request.user)
    return render(request, 'FavoritesPage.html', {'favorites': favorites})

@login_required
def add_favorite(request, word):
    FavoriteWord.objects.create(user=request.user, word=word)
    return redirect('favorite_words')

@login_required
def remove_favorite(request, pk):
    FavoriteWord.objects.filter(pk=pk, user=request.user).delete()
    return redirect('favorite_words')

logger = logging.getLogger(__name__)

@login_required
def show_favorite_words(request):
    # Retrieve the authenticated user
    user = request.user

    # Query the favorite words specific to the user
    favorite_words = FavoriteWord.objects.filter(user=user)

    # Pass the favorite words to the template for rendering
    return render(request, 'FavoritesPage.html', {'favorite_words': favorite_words})


def soft_delete_favorite(request, favorite_id):
    favorite = FavoriteWord.objects.get(id=favorite_id)
    favorite.is_deleted = True
    favorite.deleted_at = timezone.now()
    favorite.save()
    return redirect('favorites_page')

def restore_favorite(request, favorite_id):
    favorite = FavoriteWord.objects.get(id=favorite_id)
    if favorite.is_deleted and (timezone.now() - favorite.deleted_at).days <= 1:
        favorite.is_deleted = False
        favorite.deleted_at = None
        favorite.save()
    return redirect('favorites_page')
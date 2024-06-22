from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.utils import timezone
from .models import FavoriteWord

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
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'You have successfully logged in.', 'username': username}, status=200) 
        else:
            # Return an 'invalid login' error message.
            return JsonResponse({'error': 'Invalid username or password.'}, status=400)
        
    elif request.method == 'GET':
        # Display the login page when the request is a GET request
        return render(request, 'userloginpage.html')

def user_logout(request):
    logout(request)
    return redirect('/homepage')

def delete_favorite(request, favorite_id):
    if request.method == 'POST':
        try:
            favorite = FavoriteWord.objects.get(id=favorite_id)
            favorite.delete()  # Delete the favorite word
        except FavoriteWord.DoesNotExist:
            # Handle case where the favorite word does not exist
            pass
    return redirect('favorites_page')  #

def show_favorite_words(request):
    # Placeholder logic for retrieving all favorite words (replace with actual query logic)
    favorite_words = FavoriteWord.objects.all()

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

def show_favorite_words(request):
    # Placeholder logic for retrieving all favorite words (replace with actual query logic)
    favorite_words = FavoriteWord.objects.all()

    # Debugging print statement to log number of favorite words
    print(f"Number of favorite words: {len(favorite_words)}")

    context = {
        'favorite_words': favorite_words,
    }
    return render(request, 'FavoritesPage.html', context)
from django.shortcuts import render, redirect
from django.http import JsonResponse, QueryDict
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.utils import timezone
from .models import FavoriteWord


def user_register(request):
    '''
    Takes in HTTP request send by the frontend, returns appropriate HTTP response in JSON
    '''
    
    if request.method == 'POST': 
        # If POST request, process the form data to register the user
        
        # Django's built-in UserCreationForm to handle user registration.
        form = UserCreationForm(request.POST) # validates input data (ensuring info meets criteria)
        
        if form.is_valid():
            # If the form fields meet the criteria, proceed to create a new user 
            
            # Extract username and password from cleaned_data dictionary attribute
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            
            try:
                # Create a new user instance and save it to the database
                new_user = User.objects.create_user(username=username, password=password)
                new_user.save()
                
                # Return a HTTP response with status code 201 for "Created" 
                return JsonResponse({'username': new_user.username, 'id': new_user.id},  status=201)
            except ValidationError as e:
                # Handle validation errors from user creation (e.g. already existing username)
                # Return a 400 Bad Request status code and a message explaining the error
                
                return JsonResponse({'error': e.messages[0]}, status=400)
        else:
            # If the form fields don't meet the criteria, send HTTP response with status code 401 ("Bad request")
            # containing the errors
        
            # Dictionary with field-json-serializable error (key-values)
            errors = {field: error.get_json_data() for field, error in form.errors.items()}
            return JsonResponse({'errors': errors}, status=400)
    else: 
        # If the request.method == 'GET', render the page with empty form
        
        form = UserCreationForm() 
        # Indicate the template and pass the empty form as context
        return render(request, 'userregisterpage.html', {'form': form})
        
def user_login(request):
    """
    Handle user login requests. Takes in HTTP request, returns appropriate HTTP response in JSON
    """
    if request.method == 'POST':
        # If POST request, process the form data to log in the user
        
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Verify username and password. User object is returned if credentials are valid, o/w None
        user = authenticate(request, username=username, password=password)        
        if user is not None:
            login(request, user) # Creates a session handled by Django
            
            # Return a HTTP response indicating failure
            return JsonResponse({'success': True, 'message': 'You have successfully logged in.', 'username': username}, status=200) 
        else:
            # Return a HTTP response indicating failure
            return JsonResponse({'success': False, 'error': 'Invalid username or password.'}, status=400)
        
    elif request.method == 'GET':
        # If GET request, display the login page 
        
        # Indicate the template to be rendered
        return render(request, 'userloginpage.html')


def user_logout(request):
    '''
    Handle user logout request. Considering its simplicity, it is preferred to be implemented in the backend
    with traditional flow and redirection.
    '''
    # Invalidates the user's session. Django deletes the session data and instructs the browser to delete the session cookie
    logout(request)
    return redirect('/homepage')

@login_required
def update_user_info(request):
    if request.method == 'PUT':
        # Django does not parse PUT request data into request.POST, so we do it manually
        data = QueryDict(request.body)
        
        user = request.user
        new_username = data.get('username')
        new_email = data.get('email')
        
        # Check if the new username is already taken
        if User.objects.exclude(pk=user.pk).filter(username=new_username).exists():
            return JsonResponse({'success': False, 'error': 'Username already taken.'}, status=400)
        
        # Proceed with updating the user's username and email
        user.username = new_username
        user.email = new_email
        user.save()
        
        return JsonResponse({'success': True}, status=200)
    else:
        return JsonResponse({'error': 'Invalid HTTP method. This endpoint requires a PUT request.'}, status=405)

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

def show_favorites(request):
    if request.user.is_authenticated:
        # Filter favorites for the currently logged-in user
        user_favorites = FavoriteWord.objects.filter(user=request.user)

        # Pass the user-specific favorites to the template for display
        context = {
            'user_favorites': user_favorites
        }
        return render(request, 'favorites_template.html', context)
    else:
        # Handle the case when the user is not authenticated (e.g., redirect to login)
        return render(request, 'login.html')
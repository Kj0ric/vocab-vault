from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Words, FrenchWord, GermanWord
from users.models import FavoriteWord
from datetime import date
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from django.utils import timezone

def homepage(request):
    # Retrieve the selected language from the session (default to English if not set)
    selected_language = request.session.get('selected_language', 'English')
    print(f"Selected Language: {selected_language}")

    # Get today's date and format it
    today = date.today()
    today_formatted = today.strftime('%d/%m/%Y')

    # Select the appropriate model based on the selected language
    if selected_language == 'French':
        WordModel = FrenchWord
    elif selected_language == 'German':
        WordModel = GermanWord
    else:
        WordModel = Words  # Default to English words model

    try:
        # Retrieve word of the day based on selected language and today's date
        word_of_the_day = WordModel.objects.get(date=today_formatted)
    except WordModel.DoesNotExist:
        word_of_the_day = None  # Handle case where no word matches today

    # Prepare context to pass to the template
    context = {
        'word_of_the_day': word_of_the_day,
        'today_formatted': today_formatted,
        'selected_language': selected_language,
    }

    return render(request, 'HomePage.html', context)

def select_language(request, language):
    request.session['selected_language'] = language
    return redirect('/homepage/')

def searchresults(request):
   
  template = loader.get_template('SearchResultsPage.html')

  return HttpResponse(template.render())

def account(request):
   
  template = loader.get_template('accountpage.html')

  return HttpResponse(template.render())

def addword(request):
    if request.method == 'POST':
      # Retrieve the form data from the POST request
      word_name = request.POST.get('word_name')  # Assuming 'word_name' is the name attribute of the word input field
      # Get other form data like part of speech, pronunciation, meaning here
      print(1)
      # Assuming the request.user is the current logged-in user
      # You might need to check if the user is authenticated before proceeding to save the word
      if request.user.is_authenticated:
          print(2)
          user = request.user
          # Create a new instance of the FavoriteWord model
          word_name = request.POST.get('word_name', '')
          phonetic = request.POST.get('phonetic', '')
          meaning = request.POST.get('meaning', '')
          date = request.POST.get('date', '')
          function = request.POST.get('function', '')
          # Set other attributes of the new_word instance
          # For example:
          # new_word.part_of_speech = request.POST.get('part_of_speech')
          # new_word.pronunciation = request.POST.get('pronunciation')
          # new_word.meaning = request.POST.get('meaning')
          new_word = FavoriteWord(user=user, word=word_name, phonetic=phonetic, meaning=meaning, date=date, function=function)

          # Save the new word to the database
          new_word.save()
          print(f"New word submitted: {word_name}")

          # Redirect to a success page or the same page after adding the word
          return redirect('/favorites')  # Change 'success_page' to the URL name of your success page

      # Return the same template for GET requests or when form submission fails
    return render(request, 'AddNewWord.html')

def favorites(request):

  if request.user.is_authenticated:
    favorites = FavoriteWord.objects.filter(user=request.user)
    return render(request, 'FavoritesPage.html', {'favorites': favorites})
  else:
    return render(request, 'FavoritesPage.html', {'favorites': None})



def flashcards(request):

  template = loader.get_template('flashcards.html')

  return HttpResponse(template.render())

def quizzes(request):

  template = loader.get_template('QuizzesPage.html')

  return HttpResponse(template.render())

def wordle(request):

  template = loader.get_template('WordlePage.html')

  return HttpResponse(template.render())

def members(request):
    return HttpResponse("Hello world!")

def delete_favorite(request, favorite_id):
    if request.method == 'POST':
        try:
            favorite = FavoriteWord.objects.get(id=favorite_id)
            favorite.delete()  # Delete the favorite word
        except FavoriteWord.DoesNotExist:
            # Handle case where the favorite word does not exist
            pass
    return redirect('/favorites')  
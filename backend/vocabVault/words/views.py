from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Words, FrenchWord, GermanWord
from datetime import date
from django.contrib.sessions.models import Session

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
   
  template = loader.get_template('AddNewWord.html')

  return HttpResponse(template.render())

def favorites(request):

  template = loader.get_template('FavoritesPage.html')

  return HttpResponse(template.render())

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
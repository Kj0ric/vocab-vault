from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Words, FrenchWord, GermanWord
from datetime import date
from django.contrib.sessions.models import Session
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core import serializers
import datetime

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


def index(request):
    print('ah yes something')
    queryset = Words.objects.all()
    query = request.GET.get('search')
    print(f"Seach query: {query}")
    if query:
        queryset = queryset.filter(
            Q(phonetic__icontains=query) |
            Q(meaning__icontains=query) |
            Q(function__icontains=query) |
            Q(word__icontains=query) |
            Q(date__icontains=query)
            
        )
    print(f"Queryset: {queryset}")
    context = {
        "object_list": queryset,
    }
    return render(request, "newSearchResults.html", context)


def wordDetail(request, word_id):

  word = get_object_or_404(Words, pk=word_id)

  today_formatted = word.date

  return render(request, 'HomePage.html', {'word_of_the_day': word, 'today_formatted': today_formatted,})




def get_words(request):
    words = Words.objects.all()
    words_list = []
    for word in words:
      
       date = datetime.datetime.strptime(word.date, '%d/%m/%Y').strftime('%Y-%m-%d')
       words_list.append({
          'title': word.word,
          'start': date,
          'url': f'/word/{word.id}/'
       })
    
    return JsonResponse(words_list, safe=False)

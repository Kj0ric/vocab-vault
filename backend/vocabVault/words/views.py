from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Words
from datetime import date

def homepage(request):
    today = date.today()
    today_formatted = today.strftime('%d/%m/%Y')  # Format today's date as dd/mm/yyyy

    try:
        word_of_the_day = Words.objects.get(date=today_formatted)
    except Words.DoesNotExist:
        word_of_the_day = None  # Handle case where no word matches today

    context = {'word_of_the_day': word_of_the_day, 'today_formatted': today_formatted}
    return render(request, 'HomePage.html', context)


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

def login(request):

  template = loader.get_template('loginpage.html')

  return HttpResponse(template.render())

def quizzes(request):

  template = loader.get_template('QuizzesPage.html')

  return HttpResponse(template.render())

def register(request):

  template = loader.get_template('registerpage.html')

  return HttpResponse(template.render())

def wordle(request):

  template = loader.get_template('WordlePage.html')

  return HttpResponse(template.render())

def members(request):
    return HttpResponse("Hello world!")
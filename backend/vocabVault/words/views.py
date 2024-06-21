from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def homepage(request):
  return render(request, 'HomePage.html')

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
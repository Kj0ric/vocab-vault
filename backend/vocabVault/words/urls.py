"""
URL configuration for VocabVault project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.homepage, name='home'),
    # path('homepage/', views.homepage, name='home'),
    path('members/', views.members, name='members'),
    path('searchresults/', views.searchresults, name='searchresults'),
    path('account/', views.account, name='account'),
    path('addnewword/', views.addword, name='addword'),
    path('favorites/', views.favorites, name='favorites'),
    path('flashcards/', views.flashcards, name='flashcards'),
    path('quizzes/', views.quizzes, name='quizzes'),
    path('wordle/', views.wordle, name='wordle'),
    



    


    
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)




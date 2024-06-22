from django.urls import path
from . import views
from words import views as word_views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'users'
urlpatterns = [
    path('register/', views.user_register, name='register'),
    path('login/', views.user_login, name='login'),
    path('homepage/', word_views.homepage, name='homepage'),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
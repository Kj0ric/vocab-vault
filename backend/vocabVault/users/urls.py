from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from words import views as word_views 

app_name = 'users'
urlpatterns = [
    path('register/', views.user_register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('update_user_info/', views.update_user_info, name='update_user_info'),
    path('homepage/', word_views.homepage, name='homepage'),
    path('favorites/', views.show_favorite_words, name='favorites'),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
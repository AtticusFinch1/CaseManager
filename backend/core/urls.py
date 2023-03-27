from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [

    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/test-suits/', include('test_suit.urls')),
    path('api/test-cases/', include('test_case.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin

from . import models

from django.contrib.auth import get_user_model
User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff')
    list_display_links = ('id', 'email', 'first_name', 'last_name')
    search_fields=('id', 'email', 'first_name', 'last_name')
    list_per_page=25

admin.site.register(User, UserAdmin)
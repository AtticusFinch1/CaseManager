from django.contrib import admin
from .models import TestCase

class TestCaseAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return True
    list_display = ('id', 'title', 'test_suit',)
    list_display_link = ('id',)
    list_per_page = 25

admin.site.register(TestCase, TestCaseAdmin)

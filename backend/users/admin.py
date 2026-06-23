from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import SeekerProfile, User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (("Portal", {"fields": ("role", "phone")}),)
    list_display = ("username", "email", "role", "is_active", "date_joined")
    list_filter = ("role", "is_active")
    search_fields = ("username", "email", "first_name", "last_name")


@admin.register(SeekerProfile)
class SeekerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "headline", "location", "experience_years")
    search_fields = ("user__username", "headline", "location")

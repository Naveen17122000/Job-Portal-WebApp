from django.contrib import admin

from applications.models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("candidate", "job", "status", "applied_at")
    list_filter = ("status", "applied_at")
    search_fields = ("candidate__username", "job__title", "job__company__name")

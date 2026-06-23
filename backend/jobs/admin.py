from django.contrib import admin

from jobs.models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "category", "location", "status", "posted_at")
    list_filter = ("status", "category", "job_type", "posted_at")
    search_fields = ("title", "company__name", "category", "location")

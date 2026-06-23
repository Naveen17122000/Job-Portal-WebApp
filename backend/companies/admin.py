from django.contrib import admin

from companies.models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "recruiter", "industry", "location", "is_verified")
    list_filter = ("is_verified", "industry")
    search_fields = ("name", "industry", "location", "recruiter__username")

from django.conf import settings
from django.db import models


class Company(models.Model):
    recruiter = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="companies"
    )
    name = models.CharField(max_length=180)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    industry = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "companies"
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["location"]),
        ]

    def __str__(self):
        return self.name

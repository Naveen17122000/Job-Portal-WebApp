from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.TextChoices):
        SEEKER = "seeker", "Job Seeker"
        RECRUITER = "recruiter", "Recruiter"
        ADMIN = "admin", "Admin"

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Roles.choices, db_index=True)
    phone = models.CharField(max_length=32, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ["email", "role"]

    class Meta:
        indexes = [
            models.Index(fields=["role"]),
            models.Index(fields=["is_active"]),
        ]


class SeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seeker_profile")
    headline = models.CharField(max_length=160, blank=True)
    location = models.CharField(max_length=120, blank=True)
    skills = models.JSONField(default=list, blank=True)
    experience_years = models.PositiveSmallIntegerField(default=0)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    portfolio_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} profile"

from django.conf import settings
from django.db import models

from companies.models import Company


class Job(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        INACTIVE = "inactive", "Inactive"

    class JobType(models.TextChoices):
        FULL_TIME = "full_time", "Full-time"
        PART_TIME = "part_time", "Part-time"
        CONTRACT = "contract", "Contract"
        INTERNSHIP = "internship", "Internship"
        REMOTE = "remote", "Remote"

    recruiter = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posted_jobs"
    )
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")
    title = models.CharField(max_length=180)
    description = models.TextField()
    category = models.CharField(max_length=120, db_index=True)
    location = models.CharField(max_length=120, db_index=True)
    salary_min = models.PositiveIntegerField(null=True, blank=True)
    salary_max = models.PositiveIntegerField(null=True, blank=True)
    job_type = models.CharField(max_length=30, choices=JobType.choices, default=JobType.FULL_TIME)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    required_skills = models.JSONField(default=list, blank=True)
    posted_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    closing_date = models.DateField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["location"]),
            models.Index(fields=["posted_at"]),
            models.Index(fields=["status"]),
            models.Index(fields=["category", "location"]),
        ]
        ordering = ["-posted_at"]

    def __str__(self):
        return f"{self.title} at {self.company.name}"

from django.conf import settings
from django.db import models

from jobs.models import Job


class Application(models.Model):
    class Status(models.TextChoices):
        APPLIED = "applied", "Applied"
        REVIEW = "review", "In Review"
        SHORTLISTED = "shortlisted", "Shortlisted"
        REJECTED = "rejected", "Rejected"
        HIRED = "hired", "Hired"

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications"
    )
    cover_letter = models.TextField(blank=True)
    resume_snapshot = models.FileField(upload_to="application_resumes/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.APPLIED)
    recruiter_notes = models.TextField(blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("job", "candidate")
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["applied_at"]),
            models.Index(fields=["job", "status"]),
        ]
        ordering = ["-applied_at"]

    def __str__(self):
        return f"{self.candidate.username} -> {self.job.title}"

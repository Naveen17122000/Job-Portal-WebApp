from rest_framework.exceptions import ValidationError

from applications.models import Application

ALLOWED_TRANSITIONS = {
    Application.Status.APPLIED: {
        Application.Status.REVIEW,
        Application.Status.SHORTLISTED,
        Application.Status.REJECTED,
    },
    Application.Status.REVIEW: {
        Application.Status.SHORTLISTED,
        Application.Status.REJECTED,
        Application.Status.HIRED,
    },
    Application.Status.SHORTLISTED: {Application.Status.REJECTED, Application.Status.HIRED},
    Application.Status.REJECTED: set(),
    Application.Status.HIRED: set(),
}


def transition_application(application, next_status, notes=""):
    """Move an application through a controlled recruiting workflow."""
    if next_status == application.status:
        return application
    if next_status not in ALLOWED_TRANSITIONS[application.status]:
        raise ValidationError(
            {"status": f"Cannot move application from {application.status} to {next_status}."}
        )
    application.status = next_status
    if notes:
        application.recruiter_notes = notes
    application.save(update_fields=["status", "recruiter_notes", "updated_at"])
    return application

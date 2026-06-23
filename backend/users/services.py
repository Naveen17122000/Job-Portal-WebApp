from django.contrib.auth import get_user_model
from django.db.models import Count

from applications.models import Application
from jobs.models import Job

User = get_user_model()


def platform_analytics():
    """Aggregate lightweight platform health metrics for admins."""
    return {
        "users": {
            "total": User.objects.count(),
            "active": User.objects.filter(is_active=True).count(),
            "by_role": list(User.objects.values("role").annotate(count=Count("id")).order_by("role")),
        },
        "jobs": {
            "total": Job.objects.count(),
            "active": Job.objects.filter(status=Job.Status.ACTIVE).count(),
            "inactive": Job.objects.filter(status=Job.Status.INACTIVE).count(),
        },
        "applications": {
            "total": Application.objects.count(),
            "by_status": list(
                Application.objects.values("status").annotate(count=Count("id")).order_by("status")
            ),
        },
    }

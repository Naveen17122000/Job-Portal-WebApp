from django.db.models import Count
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from common.permissions import IsRecruiterRole
from jobs.models import Job
from jobs.serializers import JobFilterSerializer, JobSerializer
from users.models import User


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Job.objects.select_related("company", "recruiter").annotate(
            application_count=Count("applications")
        )
        user = self.request.user
        if user.role == User.Roles.RECRUITER:
            queryset = queryset.filter(recruiter=user)
        elif user.role == User.Roles.SEEKER:
            queryset = queryset.filter(status=Job.Status.ACTIVE)

        filters = JobFilterSerializer(data=self.request.query_params)
        filters.is_valid(raise_exception=True)
        data = filters.validated_data
        if data.get("category"):
            queryset = queryset.filter(category__icontains=data["category"])
        if data.get("location"):
            queryset = queryset.filter(location__icontains=data["location"])
        if data.get("salary_min") is not None:
            queryset = queryset.filter(salary_max__gte=data["salary_min"])
        if data.get("salary_max") is not None:
            queryset = queryset.filter(salary_min__lte=data["salary_max"])
        if data.get("status"):
            queryset = queryset.filter(status=data["status"])
        return queryset

    def get_permissions(self):
        if self.action in {"create", "update", "partial_update", "destroy"}:
            return [IsRecruiterRole()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

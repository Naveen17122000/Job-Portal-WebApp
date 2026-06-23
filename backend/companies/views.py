from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from common.permissions import IsRecruiterRole
from companies.models import Company
from companies.serializers import CompanySerializer
from users.models import User


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Company.objects.select_related("recruiter").order_by("name")
        if user.role == User.Roles.ADMIN:
            return queryset
        if user.role == User.Roles.RECRUITER:
            return queryset.filter(recruiter=user)
        return queryset.filter(is_verified=True)

    def get_permissions(self):
        if self.action in {"list", "retrieve"}:
            return [IsAuthenticated()]
        return [IsRecruiterRole()]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

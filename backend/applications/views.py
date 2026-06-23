from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from applications.models import Application
from applications.serializers import ApplicationSerializer, ApplicationStatusSerializer
from applications.services import transition_application
from common.permissions import IsJobSeekerRole
from common.responses import success_response
from users.models import User


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Application.objects.select_related("job", "job__company", "candidate")
        if user.role == User.Roles.ADMIN:
            return queryset
        if user.role == User.Roles.RECRUITER:
            return queryset.filter(job__recruiter=user)
        return queryset.filter(candidate=user)

    def get_permissions(self):
        if self.action == "create":
            return [IsJobSeekerRole()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)

    def update(self, request, *args, **kwargs):
        return Response(
            {
                "success": False,
                "message": "Use the status action to update applications.",
                "errors": {},
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @action(detail=True, methods=["patch"], url_path="status")
    def status(self, request, pk=None):
        application = self.get_object()
        if request.user.role not in {User.Roles.RECRUITER, User.Roles.ADMIN}:
            return success_response({}, "Only recruiters and admins can change status.", 403)
        serializer = ApplicationStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        transition_application(
            application,
            serializer.validated_data["status"],
            serializer.validated_data.get("recruiter_notes", ""),
        )
        return success_response(ApplicationSerializer(application).data, "Application status updated")

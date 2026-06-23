from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from common.permissions import IsAdminRole, IsJobSeekerRole
from common.responses import success_response
from users.models import SeekerProfile, User
from users.serializers import (
    AdminUserUpdateSerializer,
    RegisterSerializer,
    SeekerProfileSerializer,
    UserSerializer,
)
from users.services import platform_analytics


class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return success_response(UserSerializer(user).data, "Account created", status.HTTP_201_CREATED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")

    def get_permissions(self):
        return [IsAdminRole()]

    def get_serializer_class(self):
        if self.action in {"update", "partial_update"}:
            return AdminUserUpdateSerializer
        return UserSerializer

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save(update_fields=["is_active"])
        return success_response(UserSerializer(user).data, "User deactivated")


class SeekerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = SeekerProfileSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Roles.ADMIN:
            return SeekerProfile.objects.select_related("user").all()
        return SeekerProfile.objects.select_related("user").filter(user=user)

    def get_permissions(self):
        if self.action in {"list", "retrieve"}:
            return [IsAuthenticated()]
        return [IsJobSeekerRole()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnalyticsView(APIView):
    permission_classes = [IsAdminRole]

    def get(self, request):
        return Response({"success": True, "data": platform_analytics()})

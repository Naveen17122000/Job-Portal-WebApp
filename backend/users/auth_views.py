from rest_framework_simplejwt.views import TokenObtainPairView

from users.serializers import PortalTokenObtainPairSerializer


class PortalTokenObtainPairView(TokenObtainPairView):
    serializer_class = PortalTokenObtainPairSerializer

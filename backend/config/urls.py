"""Root URL configuration."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from applications.views import ApplicationViewSet
from companies.views import CompanyViewSet
from jobs.views import JobViewSet
from users.auth_views import PortalTokenObtainPairView
from users.views import AnalyticsView, RegisterView, SeekerProfileViewSet, UserViewSet



def home(request):
    return HttpResponse("Django backend is running successfully.")

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("profiles", SeekerProfileViewSet, basename="profiles")
router.register("companies", CompanyViewSet, basename="companies")
router.register("jobs", JobViewSet, basename="jobs")
router.register("applications", ApplicationViewSet, basename="applications")

urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/token/", PortalTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/analytics/", AnalyticsView.as_view(), name="analytics"),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

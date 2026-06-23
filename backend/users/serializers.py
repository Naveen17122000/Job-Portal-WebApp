from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import SeekerProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
            "is_active",
            "date_joined",
        ]
        read_only_fields = ["id", "date_joined"]


class PortalTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Add stable UI routing claims to the JWT payload."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["role"] = user.role
        token["email"] = user.email
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name", "role", "phone"]
        read_only_fields = ["id"]

    def validate_role(self, value):
        if value == User.Roles.ADMIN:
            raise serializers.ValidationError("Admin accounts must be created by an existing admin.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        if user.role == User.Roles.SEEKER:
            SeekerProfile.objects.create(user=user)
        return user


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "role", "phone", "is_active"]


class SeekerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = SeekerProfile
        fields = [
            "id",
            "user",
            "headline",
            "location",
            "skills",
            "experience_years",
            "resume",
            "portfolio_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

    def validate_skills(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Skills must be a list of strings.")
        return [str(skill).strip() for skill in value if str(skill).strip()]

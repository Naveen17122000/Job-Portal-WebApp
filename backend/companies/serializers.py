from rest_framework import serializers

from companies.models import Company


class CompanySerializer(serializers.ModelSerializer):
    recruiter_name = serializers.CharField(source="recruiter.get_full_name", read_only=True)

    class Meta:
        model = Company
        fields = [
            "id",
            "recruiter",
            "recruiter_name",
            "name",
            "website",
            "location",
            "industry",
            "description",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "recruiter", "is_verified", "created_at", "updated_at"]

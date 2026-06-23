from rest_framework import serializers

from companies.models import Company
from jobs.models import Job


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)
    application_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Job
        fields = [
            "id",
            "recruiter",
            "company",
            "company_name",
            "title",
            "description",
            "category",
            "location",
            "salary_min",
            "salary_max",
            "job_type",
            "status",
            "required_skills",
            "application_count",
            "posted_at",
            "updated_at",
            "closing_date",
        ]
        read_only_fields = ["id", "recruiter", "posted_at", "updated_at", "application_count"]

    def validate_company(self, value):
        request = self.context["request"]
        if request.user.role != "admin" and value.recruiter_id != request.user.id:
            raise serializers.ValidationError("You can only post jobs for your own company.")
        return value

    def validate(self, attrs):
        salary_min = attrs.get("salary_min", getattr(self.instance, "salary_min", None))
        salary_max = attrs.get("salary_max", getattr(self.instance, "salary_max", None))
        if salary_min and salary_max and salary_min > salary_max:
            raise serializers.ValidationError({"salary_max": "Maximum salary must exceed minimum salary."})
        return attrs

    def validate_required_skills(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Required skills must be a list.")
        return [str(skill).strip() for skill in value if str(skill).strip()]


class JobFilterSerializer(serializers.Serializer):
    category = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    salary_min = serializers.IntegerField(required=False, min_value=0)
    salary_max = serializers.IntegerField(required=False, min_value=0)
    status = serializers.ChoiceField(required=False, choices=Job.Status.choices)

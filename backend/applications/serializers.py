from rest_framework import serializers

from applications.models import Application
from jobs.models import Job


class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source="candidate.get_full_name", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)
    company_name = serializers.CharField(source="job.company.name", read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "job_title",
            "company_name",
            "candidate",
            "candidate_name",
            "cover_letter",
            "resume_snapshot",
            "status",
            "recruiter_notes",
            "applied_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "candidate",
            "status",
            "recruiter_notes",
            "applied_at",
            "updated_at",
        ]

    def validate_job(self, value):
        if value.status != Job.Status.ACTIVE:
            raise serializers.ValidationError("Applications are only accepted for active jobs.")
        return value


class ApplicationStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Application.Status.choices)
    recruiter_notes = serializers.CharField(required=False, allow_blank=True)

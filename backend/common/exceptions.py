from rest_framework.views import exception_handler


def standard_exception_handler(exc, context):
    """Normalize DRF errors without hiding useful field-level validation details."""
    response = exception_handler(exc, context)
    if response is None:
        return response

    response.data = {
        "success": False,
        "message": getattr(exc, "default_detail", "Request failed."),
        "errors": response.data,
    }
    return response

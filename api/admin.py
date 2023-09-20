from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Config)
class ConfigAdmin(admin.ModelAdmin):
    def get_admin_url(self, obj=None):
        if obj is None:
            # Retrieve the first object if not provided
            obj = self.model.objects.first()
        return super().get_admin_url(obj)

    def has_add_permission(self, request):
        # Disable the ability to add new objects
        return False

    def has_delete_permission(self, request, obj=None):
        # Disable the ability to delete the object
        return False
admin.site.register(models.Entry)
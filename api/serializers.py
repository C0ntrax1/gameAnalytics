from rest_framework import serializers
from . import models
import ast


class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Config
        fields = "__all__"


class ListCharField(serializers.ListField):
    child = serializers.CharField()


class EntrySerializer(serializers.ModelSerializer):
    value = ListCharField()

    class Meta:
        model = models.Entry
        fields = "__all__"


class ViewEntrySerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField()

    def get_value(self, obj):
        try:
            value_as_list = ast.literal_eval(obj.value)
            if isinstance(value_as_list, list):
                return value_as_list
        except (ValueError, SyntaxError):
            pass
        return []

    class Meta:
        model = models.Entry
        fields = "__all__"

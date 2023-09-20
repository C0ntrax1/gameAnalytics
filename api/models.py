from django.db import models

# Create your models here.


class Config(models.Model):
    refresh_rate = models.PositiveIntegerField(
        default=15,
        help_text="Refresh rate (in minutes).",
    )

    def save(self, *args, **kwargs):
        if not self.pk and Config.objects.exists():
            # Only allow updating the existing object
            raise ValueError("Cannot create another Config object.")
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Disable deletion of the object
        raise ValueError("Cannot delete the Config object.")

    def __str__(self):
        return "Config"

    class Meta:
        verbose_name_plural = "Config"


class Entry(models.Model):
    userid = models.IntegerField(blank=False, null=False)
    lvl = models.IntegerField(blank=False, null=False)
    value = models.TextField(blank=False, null=False)

    def __str__(self):
        return f"[{self.userid}] - Lvl {self.lvl} => {self.value}"

    class Meta:
        verbose_name_plural = "Entries"

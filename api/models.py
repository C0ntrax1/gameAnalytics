from django.db import models

# Create your models here.


class Entry(models.Model):
    userid = models.IntegerField(blank=False, null=False)
    lvl = models.IntegerField(blank=False, null=False)
    value = models.TextField(blank=False, null=False)

    def __str__(self):
        return f"[{self.userid}] - Lvl {self.lvl} => {self.value}"

from django.db import models
from django.utils.text import slugify

class Bikes(models.Model):
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    name_bike = models.CharField(max_length=200,blank=False, default='')
    status = models.CharField(max_length=200,blank=False, default='')
    img_bike = models.CharField(max_length=200,blank=False, default='')
    slot_num = models.IntegerField()
    def __str__(self):
        return str(self.id)

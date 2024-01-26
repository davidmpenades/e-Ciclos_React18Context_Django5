from django.db import models

class Stations(models.Model):
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    name = models.CharField(max_length=100)        
    num_bikes = models.IntegerField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=False)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=False)
    status = models.CharField(max_length=100)    
    img_st = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)


from django.db import models

# Create your models here.


class User(models.Model):
    idmember = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    name = models.CharField(max_length=45)
    address = models.CharField(max_length=45)
    telephone = models.CharField(max_length=45)

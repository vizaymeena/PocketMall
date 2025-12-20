from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=50,blank=True,null=True)
    name    = models.CharField( max_length  = 20,  blank = True, null  = True  )
    email   = models.EmailField( max_length = 100, unique = True )
    gender  = models.CharField( max_length  = 10,  null  = True, blank = True )
    password = models.CharField(max_length=10,blank=True,null=True)
    profile = models.ImageField( upload_to = "user/profile/" , blank = True, null=True ) 

    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'Created :- {self.name}'
   

class AddressInfo(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="users")
    # Address info
    address =   models.CharField( max_length = 100, blank=True,  null = True )
    state   =   models.CharField( max_length = 50,  blank=True,  null = True )
    city    =   models.CharField( max_length = 50,  null=True,   blank = False )
    town    =   models.CharField( max_length = 50,  blank=True,  null  = True )
    pincode =   models.CharField( max_length = 10,  null=True,   blank = True )

    def __str__(self):
        return f"Address Created :- {self.address}"



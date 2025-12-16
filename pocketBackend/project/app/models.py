from django.db import models
from django.contrib.auth.models import User


# ------------------ CATEGORY ------------------
class Category(models.Model):
    name = models.CharField(max_length=100,blank=False,null=False,default="male") 
    prefix = models.CharField(max_length=10,blank=True,null=True,default="M") 
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


# ------------------ PRODUCT ------------------
class Product(models.Model):
    
    name = models.CharField(max_length=200)
    product_code = models.CharField(max_length=10,blank=True,null=False)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    description = models.TextField()

    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percent = models.DecimalField(max_digits=4,decimal_places=2,null=True,blank=True)

    brand = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    

    def save(self,*args,**kwargs):
        
        # create product code for the incoming data 
        if not self.product_code:

            prefix = self.category.prefix.upper() # "M"
            last_product = Product.objects.filter(category=self.category).order_by('-id').first()

            if last_product and last_product.product_code:
                last_number = len(prefix) + int(last_product.product_code[len(prefix)+2:])
            else:
                last_number = 0

            new_number = last_number + 1

            self.product_code = f"#{prefix}{new_number:05d}"
    # always save if incoming data have product code or not
        super().save(*args,**kwargs)

            
# ------------------ PRODUCT IMAGE GALLERY ------------------
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='products/')
    thumbnail = models.ImageField(upload_to='products/thumbs/', blank=True, null=True)
    is_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        return f"Image of {self.product.name}"

    def make_thumbnail(self, image_field, size=(300, 300)):
        img = Image.open(image_field)

        img = img.convert("RGB")
        img.thumbnail(size)

        buffer = BytesIO()
        img.save(buffer, "JPEG", quality=70, optimize=True)
        buffer.seek(0)

        return ContentFile(buffer.read(), name=f"thumb_{image_field.name}")

    def compress_image(self, image_field):
        img = Image.open(image_field)

        # Resize full-size image if too large
        max_size = (1200, 1200)
        img.thumbnail(max_size)

        img = img.convert("RGB")

        buffer = BytesIO()
        img.save(buffer, "JPEG", quality=75, optimize=True)
        buffer.seek(0)

        return ContentFile(buffer.read(), name=image_field.name)
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None

        # FIRST save -> create DB row and PK
        super().save(*args, **kwargs)

        if is_new:
            updated_fields = []

            # Compress original
            compressed = self.compress_image(self.image)
            self.image.save(self.image.name, compressed, save=False)
            updated_fields.append("image")

            # Generate thumbnail
            if not self.thumbnail:
                thumb = self.make_thumbnail(self.image)
                self.thumbnail.save(
                    f"thumb_{self.image.name}",
                    thumb,
                    save=False
                )
                updated_fields.append("thumbnail")

            # SECOND save -> UPDATE ONLY (no INSERT)
            if updated_fields:
                super().save(update_fields=updated_fields)

    



# ------------------ PRODUCT VARIANTS ------------------
class ProductVariant(models.Model):
    SIZE_CHOICES = [
        ("XS", "Extra Small"),
        ("S", "Small"),
        ("M", "Medium"),
        ("L", "Large"),
        ("XL", "Extra Large"),
        ("XXL", "Double Extra Large"),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    size = models.CharField(max_length=4, choices=SIZE_CHOICES)
    color = models.CharField(max_length=50)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.name} — {self.size} / {self.color}"


# ------------------ REVIEWS ------------------
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    rating = models.PositiveIntegerField(default=1)  # 1-5
    comment = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review {self.rating}⭐ on {self.product.name}"


# ------------------ CART ------------------
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} × {self.variant}"


# ------------------ ORDER ------------------
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    status = models.CharField(
        max_length=50,
        default="Processing"
    )

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)

    price_at_purchase = models.DecimalField(max_digits=12, decimal_places=2)  # store price history

    def __str__(self):
        return f"{self.quantity} × {self.product.name}"

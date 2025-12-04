from django.db import models
from django.contrib.auth.models import User


# ------------------ CATEGORY ------------------
class Category(models.Model):
    name = models.CharField(max_length=100)  # Mens, Womens, Kids
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


# ------------------ SUB CATEGORY ------------------
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories")
    name = models.CharField(max_length=100)  # T-shirts, Sweaters, Jeans, Hoodies...
    slug = models.SlugField(unique=True)

    def __str__(self):
        return f"{self.category.name} → {self.name}"


# ------------------ PRODUCT ------------------
class Product(models.Model):
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name="products")

    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    brand = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# ------------------ PRODUCT IMAGE GALLERY ------------------
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='products/')
    is_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        return f"Image of {self.product.name}"


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

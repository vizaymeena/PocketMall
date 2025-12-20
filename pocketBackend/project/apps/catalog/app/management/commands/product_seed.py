import json
import os

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File

from apps.catalog.models import Category, Product, ProductVariant, ProductImage


class Command(BaseCommand):
    help = "Seed categories, products, variants and images"

    def handle(self, *args, **kwargs):

        # ---------- JSON PATH ----------
        json_path = os.path.join(settings.FIXTURES_DIR, "products.json")

        if not os.path.exists(json_path):
            self.stdout.write(self.style.ERROR("❌ products.json not found"))
            return

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # ---------- CATEGORIES ----------
        for c in data["categories"]:
            Category.objects.get_or_create(
                slug=c["slug"],
                defaults={
                    "name": c["name"],
                    "prefix": c["prefix"]
                }
            )

        # ---------- PRODUCTS ----------
        for p in data["products"]:
            Product.objects.get_or_create(
                name=p["name"],
                category_id=p["category"],
                defaults={
                    "description": p["description"],
                    "price": p["price"],
                    "discount_price": p.get("discount_price"),
                    "discount_percent": p.get("discount_percent"),
                    "brand": p.get("brand")
                }
            )

        # ---------- VARIANTS ----------
        SIZES = ["S", "M", "L", "XL"]
        COLORS = ["Black", "Blue", "White"]

        for product in Product.objects.all():
            for size in SIZES:
                for color in COLORS:
                    ProductVariant.objects.get_or_create(
                        product=product,
                        size=size,
                        color=color,
                        defaults={"stock": 50}
                    )

        # ---------- IMAGES ----------
        image_path = os.path.join(settings.FIXTURES_DIR, "image" , "sample.webp")


        if not os.path.exists(image_path):
            self.stdout.write(
                self.style.WARNING("⚠ sample.jpg not found, skipping images")
            )
        else:
            for product in Product.objects.all():
                if product.images.exists():
                    continue  # avoid duplicate images

                with open(image_path, "rb") as img:
                    ProductImage.objects.create(
                        product=product,
                        image=File(img, name=f"{product.id}.jpg"),
                        is_thumbnail=True
                    )

        self.stdout.write(self.style.SUCCESS("Seeding completed successfully"))

import re
import json
from decimal import Decimal
from rest_framework import serializers
from .models import Product, Category, ProductImage, ProductVariant

import logging
logger = logging.getLogger(__name__)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "thumbnail", "is_thumbnail"]
        read_only_fields = ["id"]


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ["id", "size", "color", "stock"]
        read_only_fields = ["id"]

class ProductSerializer(serializers.ModelSerializer):

    # === READ ===
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    # === WRITE ===
    delete_images = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    variants_data = serializers.CharField(write_only=True, required=False)

    category = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=Category.objects.all()
    )

    product_code = serializers.CharField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "product_code",
            "brand",
            "category",
            "description",
            "price",
            "discount_price",
            "discount_percent",
            "is_active",
            "images",
            "variants",
            "variants_data",
            "delete_images",
        ]
        read_only_fields = ["id", "product_code", "created_at", "updated_at"]

    # === VALIDATE ===
    def validate_name(self, value):
        if not (6 <= len(value) <= 100):
            raise serializers.ValidationError(
                "Product name must be between 6 and 100 characters."
            )

        if not re.match(r'^[A-Za-z0-9 ]+$', value):
            raise serializers.ValidationError(
                "Product name can only contain letters, numbers, and spaces."
            )
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value

    def validate(self, attrs):
        instance = self.instance

        price = attrs.get("price", instance.price if instance else None)
        discount_price = attrs.get("discount_price")

        if discount_price is None:
            return attrs

        if discount_price < 0:
            raise serializers.ValidationError(
                {"discount_price": "Discount amount cannot be negative."}
            )

        if discount_price > price:
            raise serializers.ValidationError(
                {"discount_price": "Discount amount cannot exceed price."}
            )

        percent = (discount_price / price) * 100
        attrs["discount_percent"] = percent.quantize(Decimal("0.01"))

        return attrs

    # === CREATE === 
    def create(self, validated_data):
        request = self.context.get("request")

        delete_images = validated_data.pop("delete_images", [])
        variants_data = validated_data.pop("variants_data", None)

        product = Product.objects.create(**validated_data)

        # -- images --
        images = request.FILES.getlist("images")
        for index, img in enumerate(images):
            ProductImage.objects.create(
                product=product,
                image=img,
                is_thumbnail=(index == 0)
            )

        # -- variants --
        if variants_data:
            variants = json.loads(variants_data)
            for v in variants:
                ProductVariant.objects.create(
                    product=product,
                    size=v["size"],
                    color=v["color"],
                    stock=v["stock"]
                )

        return product

    # === UPDATE === 
    def update(self, instance, validated_data):
        logger.warning("Updated Request Reached %s",validated_data)
        logger.warning("Updated Product Name is %s",validated_data["name"])

        request = self.context.get("request")

        delete_images = validated_data.pop("delete_images", [])
        variants_data = validated_data.pop("variants_data", None)

        # update product fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # delete selected images
        if delete_images:
            ProductImage.objects.filter(id__in=delete_images).delete()

        # add new images
        images = request.FILES.getlist("images")
        for index, img in enumerate(images):
            ProductImage.objects.create(
                product=instance,
                image=img,
                is_thumbnail=(index == 0)
            )

        # replace variants
        if variants_data:
            ProductVariant.objects.filter(product=instance).delete()
            variants = json.loads(variants_data)

            for v in variants:
                ProductVariant.objects.create(
                    product=instance,
                    size=v["size"],
                    color=v["color"],
                    stock=v["stock"]
                )

        return instance


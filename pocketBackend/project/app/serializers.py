import re

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'name',
            'brand',
            'category',
            'description',
            'price',
            'discount_price',
            'discount_percent',
            'is_active'
        ]
        read_only_fields = ['id', 'product_code', 'created_at', 'updated_at']

    # -----------------------------
    # VALIDATIONS
    # -----------------------------

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
        price = attrs.get("price")
        discount_price = attrs.get("discount_price")
        discount_percent = attrs.get("discount_percent")

        if discount_price is not None:

            if discount_price >= price:
                raise serializers.ValidationError(
                    {"discount_price": "Discount price must be less than the price."}
                )

        if discount_percent is not None:

            if not (0 <= discount_percent <= 100):
                raise serializers.ValidationError(
                    {"discount_percent": "Discount percent must be between 0 and 100."}
                )

            if discount_price is not None:
                expected_price = price - (price * discount_percent / 100)

                if abs(expected_price - discount_price) > 1:
                    raise serializers.ValidationError(
                        {"discount_price": "Discount price does not match the percent value."}
                    )

        return attrs

    def create(self, validated_data):
        return super().create(validated_data)

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
import json

from .models import Product, ProductImage, ProductVariant, Category
from .serializers import ProductSerializer  # We'll modify this too


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def create(self, request, *args, **kwargs):
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)

        data = request.data
        images = request.FILES.getlist('images')

        # convert variants into array
        variants = json.loads(data.get("variants"))

        category = Category.objects.create(name=data["category"],prefix=data.get("category")[0:1].upper())
        data["category"] = category
        # 1. Create product (same logic)
        product = serializers.save()

        

        # 2. Create images
        for index, img in enumerate(images):
            ProductImage.objects.create(
                product=product,
                image=img,
                is_thumbnail=(index == 0)
            )

        # 3. Create variants
        for v in variants:
            ProductVariant.objects.create(
                product=product,
                size=v["size"],
                color=v["color"],
                stock=v["stock"]
            )

        return Response({"message": "Product created"}, status=status.HTTP_201_CREATED)

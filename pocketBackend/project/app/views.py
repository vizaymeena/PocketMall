from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
import json

from .models import Product, ProductImage, ProductVariant, Category
from .serializers import ProductSerializer  # We'll modify this too
import logging
logger = logging.getLogger(__name__)



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request}   # needed for FILES in serializer
        )

        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        return Response(
            ProductSerializer(product).data,
            status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

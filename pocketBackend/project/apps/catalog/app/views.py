from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializer  # We'll modify this too

from apps.common.pagination import InfiniteScrollPagination

import logging
logger = logging.getLogger(__name__)



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.none()
    serializer_class = ProductSerializer
    pagination_class = InfiniteScrollPagination

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).order_by("-id")
        category = self.request.query_params.get("category")

        if category:
            qs = qs.filter(category__slug = category)

        return qs
    
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


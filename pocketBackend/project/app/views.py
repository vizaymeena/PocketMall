from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
import json

from .models import Product, ProductImage, ProductVariant, Category
from .serializers import ProductSerializer  # We'll modify this too




class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def create(self, request, *args, **kwargs):

        images = self.request.data.getlist("images")

        print("=========================")
        print("=========================")

        print("Number of images:", len(images))
        print(request.data.get("category"))
        
        print(request.data.get("discount_price"))
        print(request.data.get("discount_percent"))

        print(type(request.data.get("category")))

        print("=========================")
        print("=========================")


        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)

        data = request.data
        images = request.FILES.getlist('images')

        category = data.get("category") 
        category_id = Category.objects.filter(slug=category).first()


        # convert variants into array
        if not data.get("variants"):
            return Response({"error":"Variants Missing in Request/None"},status=400)
        
        variants = json.loads(data.get("variants"))

        try:
            variants = json.loads(data.get("variants"))
        except Exception as e:
            print("JSON parse error:", e)
            return Response({"error": "Invalid variants JSON"}, status=400)
            

        # 1. Create product (same logic)

        print("+++++++++++++++++++++++++++++++++++++")
        print("+++++++++++++++++++++++++++++++++++++")
        print("CATEGORY ID :",category_id.id)
        print("+++++++++++++++++++++++++++++++++++++")
        print("+++++++++++++++++++++++++++++++++++++")


        product = serializers.save(category=category_id)        

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

from django.contrib.auth.models import User, update_last_login
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products

from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        data.update(serializer)

        # for key, value in serializer.items():
        #     data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(req):
    return Response('Hello')


@api_view(['GET'])
def getProducts(req):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(req, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUserProfile(req):
    user = req.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

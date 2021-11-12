from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

# Create your views here.


@api_view(['GET'])
def getRoutes(req):
    return Response('Hello')


@api_view(['GET'])
def getProducts(req):
    return Response(products)


@api_view(['GET'])
def getProduct(req, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)

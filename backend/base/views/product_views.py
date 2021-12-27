from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.products import products


from base.serializers import ProductSerializer

from rest_framework import status


#####  Products  #####

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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(req):
    user = req.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(req, pk):
    data = req.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(req, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Removed')


@api_view(['POST'])
def uploadImage(req):
    data = req.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = req.FILES.get('image')
    product.save()
    return Response('Image Uploaded.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(req, pk):
    user = req.user
    product = Product.objects.get(_id=pk)
    data = req.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if(alreadyExists):
        content = {'details': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - Customer sent a review with no ratings
    elif data['rating'] == 0:
        content = {'details': 'Please select a rating.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review was added.')
